import AuthContent from '@organisms/AuthContent';
import {FC} from 'react';
import {SignupScreenProps} from 'types/authStackTypes';
import { handleFirebaseError, userSignup } from '@services/authService';
import { User } from 'types/userTypes';
import { AuthFormValues } from 'types/authFormTypes';
import { FormikHelpers } from 'formik';

const SignupScreen: FC<SignupScreenProps> = ({navigation}) => {
  const handleSubmit = async (
    values: AuthFormValues,
    actions: FormikHelpers<AuthFormValues>,
  ) => {    try {
      const user = await userSignup(values.email, values.password);
      console.log('user in signup: ', user)
    } catch (error) {
      handleFirebaseError(error, actions);
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
