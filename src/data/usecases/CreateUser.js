import userRepository from '../repositories/userRepository';

class CreateUser {
  constructor(user) {
    this.userRepository = user;
  }

  async execute(email, password, name, username) {
    try {
      const newUser = await this.userRepository.createUser(email, password, name, username);
      console.log('User created successfully');
      return newUser;
    } catch (error) {
      console.error('Error creating user: ', error);
      throw error;
    }
  }
}

const createUser = new CreateUser(userRepository);

export default createUser;
