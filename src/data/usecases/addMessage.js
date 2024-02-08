import chatRepository from '../repositories/chatRepository';

class AddMessage {
  async execute(chatId, messageData) {
    try {
      await chatRepository.sendMessage(chatId, messageData);
      console.log('Message added successfully');
    } catch (error) {
      console.error('Error adding message: ', error);
      throw error;
    }
  }
}

export default new AddMessage();
