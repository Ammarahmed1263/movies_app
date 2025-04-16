import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {FormikErrors, FormikHelpers} from 'formik';
import {SetStateAction} from 'react';
import Config from 'react-native-config';
import {AuthFormValues} from 'types/authFormTypes';
import {User} from 'types/userTypes';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});

export const userSignup = async (
  email: User['email'],
  password: User['password'],
) => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);
    await firestore().collection('users').doc(user.user.uid).set({});
    console.log('User account created & signed in!');
    return user;
  } catch (e: any) {
    throw e;
  }
};
export const userLogin = async (
  email: User['email'],
  password: User['password'],
) => {
  try {
    const user = await auth().signInWithEmailAndPassword(email, password);
    console.log('user loggedin successfully');
    return user;
  } catch (e: any) {
    throw e;
  }
};
export const userLogout = async () => {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
  } catch (e) {
    throw e;
  }
};

export const onGoogleButtonPress = async (
  setValues: (
    values: SetStateAction<AuthFormValues>,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<AuthFormValues>>,
  setSubmitting: (isSubmitting: boolean) => void,
) => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const signInResult = await GoogleSignin.signIn();

    // @ts-ignore
    const idToken = signInResult.idToken || signInResult.data?.idToken;
    if (!idToken) {
      return;
    }

    const userEmail = signInResult.data?.user?.email!;

    setValues({email: userEmail, password: ''});

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    setSubmitting(true);
    const userCredential = await auth().signInWithCredential(googleCredential);

    const userDocRef = firestore()
      .collection('users')
      .doc(userCredential.user.uid);
    const docSnapshot = await userDocRef.get();
    if (!docSnapshot.exists) {
      await userDocRef.set({});
    }

    return userCredential;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  } finally {
    setSubmitting(false);
  }
};

export const generateFirebaseErrorMessage = (error: any) => {
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
      return "Password doesn't match entered email address";
    case 'auth/user-not-found':
      return "User doesn't exits";
    default:
      return error.message;
  }
};

export const handleFirebaseError = (
  error: any,
  actions: FormikHelpers<AuthFormValues>,
) => {
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
