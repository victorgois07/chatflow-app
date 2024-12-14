import { getDatabase, onValue, push, ref } from 'firebase/database';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies, camelcase
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import RoomRepository from '../../../data/repositories/roomRepository';

export default function ChatRoom({ roomName }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState();
  const [isPrivate, setIsPrivate] = useState(false);
  const [adminUserId, setAdminUserId] = useState();
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  const getUsernameFromToken = () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('No token found');
      return null;
    }

    try {
      const decoded = jwtDecode(token);
      setUsername(decoded.name);
      setUserId(decoded.user_id);
    } catch (error) {
      console.error('Error decoding the token', error);
      return null;
    }
  };

  const checkRoomAccess = roomData => {
    if (roomData.isPrivate && roomData.admin !== userId) {
      navigate('/error');
    } else {
      setIsPrivate(roomData.isPrivate);
      setAdminUserId(roomData.admin);
    }
  };

  const fetchRoomData = async () => {
    try {
      const roomsData = await RoomRepository.getAllRooms();
      const roomList = Object.keys(roomsData).map(key => ({
        ...roomsData[key],
        id: key
      }));

      const userAdminRooms = roomList.filter(room => room.admin === userId);

      console.log('userAdminRooms', userAdminRooms);

      if (userAdminRooms.length > 0) {
        checkRoomAccess(userAdminRooms[0]);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    getUsernameFromToken();
  }, []);

  useEffect(() => {
    if (userId) {
      console.log('roomAccess', userId);
      fetchRoomData();
    }
  }, [userId]);

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `rooms/${roomName}/messages`);

    const unsubscribe = onValue(messagesRef, snapshot => {
      const data = snapshot.val();
      const loadedMessages = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [roomName]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const db = getDatabase();
    const messageData = {
      text: newMessage,
      timestamp: Date.now(),
      // eslint-disable-next-line object-shorthand
      username: username
    };
    push(ref(db, `rooms/${roomName}/messages`), messageData);
    setNewMessage('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        maxWidth: '600px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}
    >
      <h2>{roomName}</h2>
      {isPrivate && adminUserId !== userId && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Você não tem permissão para acessar esta sala, solicite ao administrador ({username}).
        </div>
      )}
      <div
        style={{
          width: '100%',
          maxHeight: '300px',
          overflowY: 'auto',
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff'
        }}
      >
        {messages.map((msg, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} style={{ margin: '5px 0', wordWrap: 'break-word' }}>
            <strong>{msg.username}</strong>: {msg.text}
            <br />
            <span
              style={{
                fontSize: '0.8em',
                color: '#888',
                display: 'block',
                textAlign: 'right'
              }}
            >
              {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          width: '100%'
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px'
          }}
          placeholder="Digite sua mensagem..."
        />
        <button
          type="button"
          onClick={handleSendMessage}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#007BFF',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

ChatRoom.propTypes = {
  roomName: PropTypes.string.isRequired
};
