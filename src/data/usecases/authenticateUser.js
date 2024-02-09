import userRepository from '../repositories/userRepository';

class AuthenticateUser {
  constructor(user) {
    this.userRepository = user;
  }

  async execute(email, password) {
    const user = await this.userRepository.signInUser(email, password);
    return user;
  }
}

const authenticateUser = new AuthenticateUser(userRepository);

export default authenticateUser;
