import { Button, Checkbox, Drawer, FormControlLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import createRoom from '../../../data/usecases/CreateRoom';

function CreateRoomDrawer({ open, onClose, userId }) {
  const [roomName, setRoomName] = useState('');
  const [maxUsers, setMaxUsers] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    console.log(roomName);
    console.log(maxUsers);
  }, [roomName, maxUsers]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await createRoom.execute({
        roomName,
        maxUsers: parseInt(maxUsers, 10),
        isPrivate,
        adminId: userId
      });
      onClose();
    } catch (error) {
      console.error('Error creating room: ', error);
    }
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingBottom: '3rem',
          padding: '5rem',
          width: '45vw'
        }}
      >
        <TextField
          label="Nome do quarto"
          fullWidth
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
          required
          style={{ marginBottom: '1.5rem' }}
        />
        <TextField
          label="Quantidade máxima de usuários"
          type="number"
          fullWidth
          value={maxUsers}
          onChange={e => setMaxUsers(e.target.value)}
          required
        />
        <FormControlLabel
          control={<Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />}
          label="Quarto privado"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Criar sala
        </Button>
      </form>
    </Drawer>
  );
}

CreateRoomDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default CreateRoomDrawer;
