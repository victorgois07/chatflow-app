import { Button, Checkbox, Drawer, FormControlLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import createRoom from '../../../data/usecases/CreateRoom';

function CreateRoomDrawer({ open, onClose, userId }) {
  const [roomName, setRoomName] = useState('');
  const [maxUsers, setMaxUsers] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

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
      <form onSubmit={handleSubmit} style={{ margin: '16px', width: '250px' }}>
        <TextField label="Room Name" fullWidth value={roomName} onChange={e => setRoomName(e.target.value)} required />
        <TextField
          label="Max Users"
          type="number"
          fullWidth
          value={maxUsers}
          onChange={e => setMaxUsers(e.target.value)}
          required
        />
        <FormControlLabel
          control={<Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />}
          label="Private Room"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Create Room
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
