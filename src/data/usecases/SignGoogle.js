import userRepository from '../repositories/userRepository';

class SignGoogle {
  constructor(user) {
    this.userRepository = user;
  }

  async execute() {
    try {
      await this.userRepository.signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google: ', error);
      throw error;
    }
  }
}

const signGoogle = new SignGoogle(userRepository);

export default signGoogle;
