import roomRepository from '../repositories/roomRepository';

class CreateRoom {
  constructor(room) {
    this.roomRepository = room;
  }

  async execute({ roomName, maxUsers, isPrivate, adminId }) {
    const roomId = await this.roomRepository.createRoom({ roomName, maxUsers, isPrivate, adminId });
    return roomId;
  }
}

const createRoom = new CreateRoom(roomRepository);

export default createRoom;
