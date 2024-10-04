import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import getDeviceLanguage from '@utils/getDeviceLanguage';
import { FormikHelpers } from 'formik';
import { AuthFormValues } from 'types/authFormTypes';
import { User } from 'types/userTypes';

export const userSignup = async (email: User["email"], password: User["password"]) => {
  try {
    const user = await auth()
    .createUserWithEmailAndPassword(
      email,
      password,
    )
    console.log('User account created & signed in!');
    return user;
  } catch (e: any) {
    throw e;
  }
}
export const userLogin = async (email: User["email"], password: User["password"]) => {
  try {
    const user = await auth().signInWithEmailAndPassword(email, password);
    console.log('user loggedin successfully');
    return user
  } catch (e: any) {
    throw e;
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

const generateFirebaseErrorMessage = (error: any) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email already exists!';  
    case 'auth/invalid-email':
      return 'Invalid email address';  
    case 'auth/weak-password':
      return 'Weak password';  
    case 'auth/invalid-credential':
      return "User credentials doesn't exist";  
    case 'auth/wrong-password':
      return "Password doesn't match entered email address"  
    case 'auth/user-not-found':
      return "User doesn't exits"  
    default:
      return error.message;
  }
};

export const handleFirebaseError = (error: any, actions: FormikHelpers<AuthFormValues>) => {
  const errorMessage = generateFirebaseErrorMessage(error);
  switch (error.code) {
    case 'auth/email-already-in-use':
    case 'auth/invalid-email':
    case 'auth/user-not-found':
      actions.setFieldError('email', errorMessage);
      break;
    case 'auth/wrong-password':
    case 'auth/weak-password':
      actions.setFieldError('password', errorMessage);
      break;
    default:
      actions.setStatus({generalError: errorMessage});
  }
};

