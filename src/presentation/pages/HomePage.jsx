import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Stack,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ChatRoom from '../components/ChatRoom';
import CreateRoomDrawer from '../components/CreateRoomDrawer';
import RoomRepository from '../../data/repositories/roomRepository'; // Import the RoomRepository

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  }),
  ...(!open && {
    '& .MuiDrawer-paper': {
      width: theme.spacing(8),
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  })
}));

const CenteredStack = styled(Stack)({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center'
});

function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCreateRoomOpen, setDrawerCreateRoomOpen] = useState(false);
  const [notificationMenuAnchorEl, setNotificationMenuAnchorEl] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const handleDrawerToggle = () => setDrawerOpen(prev => !prev);
  const handleNotificationMenuOpen = event => setNotificationMenuAnchorEl(event.currentTarget);
  const handleNotificationMenuClose = () => setNotificationMenuAnchorEl(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await RoomRepository.getAllRooms();
        const roomList = Object.keys(roomsData).map(key => ({
          ...roomsData[key],
          id: key
        }));
        setRooms(roomList);
        console.log(roomList);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
    console.log(rooms);
  }, []);

  return (
    <CenteredStack>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="toggle navigation drawer" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <TextField
            variant="outlined"
            color="primary"
            size="small"
            placeholder="Buscar quartos"
            sx={{ marginRight: 2 }}
          />
          <IconButton color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setDrawerCreateRoomOpen(true)}
            style={{ backgroundColor: '#000000', color: '#fff' }}
          >
            Criar quarto
          </Button>
          <CreateRoomDrawer
            open={drawerCreateRoomOpen}
            onClose={() => setDrawerCreateRoomOpen(false)}
            userId={localStorage.getItem('userId')}
          />
          <IconButton color="inherit" onClick={handleNotificationMenuOpen} aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
          <Menu
            anchorEl={notificationMenuAnchorEl}
            open={Boolean(notificationMenuAnchorEl)}
            onClose={handleNotificationMenuClose}
          >
            <MenuItem onClick={handleNotificationMenuClose}>Notification 1</MenuItem>
            <MenuItem onClick={handleNotificationMenuClose}>Notification 2</MenuItem>
          </Menu>
          <IconButton color="inherit" aria-label="logout">
            <LogoutIcon
              onClick={() => {
                localStorage.removeItem('metabase.DEVICE');
                localStorage.removeItem('metabase.SESSION');
                localStorage.removeItem('csrftoken');
                localStorage.removeItem('userId');
                localStorage.removeItem('userToken');
                navigate('/login');
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={drawerOpen}>
        <List sx={{ pt: 10 }}>
          <Typography variant="h6" sx={{ ml: 2, mb: 2 }}>
            Salas disponíveis
          </Typography>
          {loading ? (
            <ListItem>
              <ListItemText primary="Loading rooms..." />
            </ListItem>
          ) : (
            rooms.map(room => (
              <ListItem
                button
                key={room.id}
                onClick={() => {
                  setCurrentRoom(room);
                  setRoomName(room.name);
                }}
              >
                <ListItemText primary={room.name} />
              </ListItem>
            ))
          )}
        </List>
      </Drawer>

      <Container component="main" maxWidth="md" sx={{ mt: 12 }}>
        <Typography variant="h4" gutterBottom align="center">
          {roomName ? `Bem-vindo(a) ao Chat ${roomName}!` : 'O Chat selecionado aparecerá aqui'}
        </Typography>
        {currentRoom ? (
          <ChatRoom roomName={currentRoom.name} />
        ) : (
          <Typography align="center">Selecione uma sala!</Typography>
        )}
      </Container>
    </CenteredStack>
  );
}

export default HomePage;
