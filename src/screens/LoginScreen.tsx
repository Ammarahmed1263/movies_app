import AuthContent from '@organisms/AuthContent';
import {handleFirebaseError, userLogin} from '@services/authService';
import {FormikHelpers} from 'formik';
import {FC} from 'react';
import {AuthFormValues} from 'types/authFormTypes';
import {LoginScreenProps} from 'types/authStackTypes';
import {User} from 'types/userTypes';

const LoginScreen: FC<LoginScreenProps> = ({navigation}) => {
  const handleSubmit = async (
    values: AuthFormValues,
    actions: FormikHelpers<AuthFormValues>,
  ) => {
    try {
      const user = await userLogin(values.email, values.password);
      console.log('user in login: ', user);
    } catch (error: any) {
      console.log('login Failed: ', error);
      handleFirebaseError(error, actions);
    }
  };

  return (
    <AuthContent isLogin navigation={navigation} onSubmit={handleSubmit} />
  );
};

export default LoginScreen;
