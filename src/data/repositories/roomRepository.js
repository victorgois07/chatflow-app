import { getDatabase, push, ref, set, get } from 'firebase/database';
import firebaseApp from '../../main/config/firebase';

class RoomRepository {
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  // Method to create a new room
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

  async getAllRooms() {
    const roomsRef = ref(this.db, 'rooms');
    try {
      const snapshot = await get(roomsRef);
      return snapshot.val();
    } catch (error) {
      console.error('Error getting rooms: ', error);
      throw error;
    }
  }
}

export default new RoomRepository();
