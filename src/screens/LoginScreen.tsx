import AuthContent from '@organisms/AuthContent';
import { FC } from 'react';
import { LoginScreenProps } from 'types/authStackTypes';

const LoginScreen: FC<LoginScreenProps> = ({navigation}) => {
  return <AuthContent isLogin navigation={navigation}/>;
}

export default LoginScreen;

