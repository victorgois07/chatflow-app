import { getDatabase, onValue, push, ref } from 'firebase/database';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function ChatRoom({ roomName }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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
    const db = getDatabase();
    push(ref(db, `rooms/${roomName}/messages`), {
      text: newMessage
    });
    setNewMessage('');
  };

  return (
    <div>
      <h2>{roomName}</h2>
      <div>
        {messages.map(msg => (
          <p key={msg.id}>{msg.text}</p>
        ))}
      </div>
      <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button type="button" onClick={handleSendMessage}>
        Enviar
      </button>
    </div>
  );
}

ChatRoom.propTypes = {
  roomName: PropTypes.string.isRequired
};
