import { getDatabase, off, onValue, push, ref } from 'firebase/database';
import firebaseApp from '../../main/config/firebase';

class ChatRepository {
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  sendMessage(chatId, message) {
    const chatRef = ref(this.db, `chats/${chatId}/messages`);
    push(chatRef, message);
  }

  subscribeToMessages(chatId, onReceiveMessages) {
    const messagesRef = ref(this.db, `chats/${chatId}/messages`);
    onValue(messagesRef, snapshot => {
      const messages = snapshot.val()
        ? Object.keys(snapshot.val()).map(key => ({
            id: key,
            ...snapshot.val()[key]
          }))
        : [];
      onReceiveMessages(messages);
    });

    return () => off(messagesRef);
  }
}

export default new ChatRepository();
