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
import React from 'react';
import ChatRoom from '../components/ChatRoom';
import CreateRoomDrawer from '../components/CreateRoomDrawer';

const drawerWidth = 200;

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  paddingTop: theme.spacing(12),
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

function HomePage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerCreateRoomOpen, setDrawerCreateRoomOpen] = React.useState(false);

  const [notificationMenuAnchorEl, setNotificationMenuAnchorEl] = React.useState(null);
  const [currentRoom, setCurrentRoom] = React.useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNotificationMenuOpen = event => {
    setNotificationMenuAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchorEl(null);
  };

  return (
    <Stack>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Home
          </Typography>
          <TextField
            variant="outlined"
            color="primary"
            size="small"
            placeholder="Search Chat Rooms"
            style={{ marginRight: 16 }}
          />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <Button variant="contained" color="inherit" onClick={() => setDrawerCreateRoomOpen(true)}>
              Create Room
            </Button>
            <CreateRoomDrawer
              open={drawerCreateRoomOpen}
              onClose={() => setDrawerCreateRoomOpen(false)}
              userId={localStorage.getItem('userId')}
            />
          </IconButton>
          <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
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
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" anchor="left" open onClose={handleDrawerToggle}>
        <List sx={{ pt: 12 }}>
          <ListItem button onClick={() => setCurrentRoom('Sala 1')}>
            <ListItemText primary="Sala 1" />
          </ListItem>
          <ListItem button onClick={() => setCurrentRoom('Sala 2')}>
            <ListItemText primary="Sala 2" />
          </ListItem>
        </List>
      </Drawer>

      <Container component="main" maxWidth="md" p={3}>
        <Typography variant="h4">Bem-vindo(a) ao Chat!</Typography>
        {currentRoom && <ChatRoom roomName={currentRoom} />}
      </Container>
    </Stack>
  );
}

export default HomePage;
