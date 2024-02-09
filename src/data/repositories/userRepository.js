import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { get, getDatabase, ref, set } from 'firebase/database';
import firebaseApp from '../../main/config/firebase';

class UserRepository {
  constructor() {
    this.auth = getAuth(firebaseApp);
    this.db = getDatabase(firebaseApp);
  }

  async createUser(email, password, name, username) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const { user } = userCredential;
      await set(ref(this.db, `users/${user.uid}`), {
        name,
        username,
        email
      });
      return user;
    } catch (error) {
      console.error('Error creating user: ', error);
      throw error;
    }
  }

  async signInUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User signed in successfully', userCredential.user);
      localStorage.setItem('userToken', userCredential.user.accessToken);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in user: ', error);
      throw error;
    }
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const { user } = result;
      localStorage.setItem('userToken', user.accessToken);
      const userRef = ref(this.db, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        await set(userRef, {
          name: user.displayName,
          email: user.email,
          username: user.displayName,
          profilePicture: user.photoURL
        });
      }
    } catch (error) {
      console.error('Error signing in with Google: ', error);
      throw error;
    }
  }

  async signOutUser() {
    try {
      await signOut(this.auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out user: ', error);
      throw error;
    }
  }
}

export default new UserRepository();
