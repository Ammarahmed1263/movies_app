import AuthContent from '@organisms/AuthContent';
import {FC} from 'react';
import {SignupScreenProps} from 'types/authStackTypes';
import { userSignup } from '@services/authService';
import { User } from 'types/userTypes';

const SignupScreen: FC<SignupScreenProps> = ({navigation}) => {
  const handleSubmit = async ({email, password}: {email: User["email"]; password: User["password"]}) => {
    try {
      const user = await userSignup(email, password);
      console.log('user is here: ', user)
    } catch (error) {
      console.log('Signup Failed: ', error)
    }
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
