import userRepository from '../repositories/userRepository';

class AuthenticateUser {
  async execute(email, password) {
    try {
      const user = await userRepository.signInUser(email, password);
      console.log('User authenticated successfully');
      return user;
    } catch (error) {
      console.error('Error authenticating user: ', error);
      throw error;
    }
  }
}

export default new AuthenticateUser();
