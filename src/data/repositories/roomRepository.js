import { getDatabase, push, ref, set } from 'firebase/database';
import firebaseApp from '../../main/config/firebase';

class RoomRepository {
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  async createRoom({ roomName, maxUsers, isPrivate, adminId }) {
    const newRoomRef = push(ref(this.db, 'rooms'));
    await set(newRoomRef, {
      name: roomName,
      maxUsers,
      isPrivate,
      admin: adminId
    });

    return newRoomRef.key;
  }
}

export default new RoomRepository();
