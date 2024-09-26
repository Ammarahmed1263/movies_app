import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from 'types/userTypes';

export const userSignup = async (email: User["email"], password: User["password"]) => {
  try {
    const userCredential = await auth()
    .createUserWithEmailAndPassword(
      email,
      password,
    )
    await firestore().collection('users').doc(userCredential.user.uid).set({name: email.split('@')[0]});
    console.log('User account created & signed in!');
    
  } catch (e: any) {
    throw handleFirebaseError(e);
  }
}
export const userLogin = async (email: User["email"], password: User["password"]) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log('user loggedin successfully');
  } catch (error) {
    throw error;
  }
}
export const userLogout = async () => {
  try {
    await auth().signOut();
    console.log('User signed out!');
  } catch (e) {
    throw e;
  }
}

const handleFirebaseError = (error: any) => {
  if (error.code === 'auth/email-already-in-use') {
    return 'Email already in use';
  } else if (error.code === 'auth/invalid-email') {
    return 'Invalid email address';
  } else if (error.code === 'auth/weak-password') {
    return 'Weak password';
  } else {
    return error.message;
  }
};