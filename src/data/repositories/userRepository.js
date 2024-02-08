import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from '../../main/config/firebase';

class UserRepository {
  constructor() {
    this.auth = getAuth(firebaseApp);
  }

  async createUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error creating user: ', error);
      throw error;
    }
  }

  async signInUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in: ', error);
      throw error;
    }
  }

  async signOutUser() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out: ', error);
      throw error;
    }
  }
}

export default new UserRepository();
