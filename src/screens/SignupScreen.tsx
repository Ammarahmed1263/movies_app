import AuthContent from '@organisms/AuthContent';
import {FC} from 'react';
import {SignupScreenProps} from 'types/authStackTypes';
import auth from '@react-native-firebase/auth';

const SignupScreen: FC<SignupScreenProps> = ({navigation}) => {
  const handleSubmit = ({email, password}: {email: string; password: string}) => {
    auth()
      .createUserWithEmailAndPassword(
        email,
        password,
      )
      .then(async (userCredential) => {
        await userCredential.user.updateProfile({displayName: email.split('@')[0]});
        console.log('User account created & signed in!', userCredential.user);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <AuthContent
      isLogin={false}
      navigation={navigation}
      onSubmit={handleSubmit}
    />
  );
};

export default SignupScreen;
