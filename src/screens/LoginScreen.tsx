import AuthContent from '@organisms/AuthContent';
import { userLogin } from '@services/authService';
import { FC } from 'react';
import { LoginScreenProps } from 'types/authStackTypes';
import { User } from 'types/userTypes';

const LoginScreen: FC<LoginScreenProps> = ({navigation}) => {
  const handleSubmit = async ({email, password}: {email: User["email"]; password: User["password"]}) => {
    try {
      const user = await userLogin(email, password);
      console.log('user is here: ', user)
    } catch (error) {
      console.log('login Failed: ', error)
    }
  };

  return <AuthContent isLogin navigation={navigation} onSubmit={handleSubmit}/>;
}

export default LoginScreen;

