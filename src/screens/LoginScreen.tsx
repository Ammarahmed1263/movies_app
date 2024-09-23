import AuthContent from '@organisms/AuthContent';
import { FC } from 'react';
import { LoginScreenProps } from 'types/authStackTypes';

const LoginScreen: FC<LoginScreenProps> = ({navigation}) => {
  const handleSubmit = () => {
    console.log('handle submit');
  }

  return <AuthContent isLogin navigation={navigation} onSubmit={handleSubmit}/>;
}

export default LoginScreen;

