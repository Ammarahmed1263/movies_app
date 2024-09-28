import {FC} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '@atoms/AppButton';
import LabelInput from './LabelInput';
import {useTheme} from '@contexts/ThemeContext';
import {Formik, FormikHelpers} from 'formik';
import {AuthFormProps, AuthFormValues} from 'types/authFormTypes';
import {loginSchema, signupSchema} from '../../validation';
import AppText from '@atoms/AppText';
import { ms, vs } from '@styles/metrics';

const AuthForm: FC<AuthFormProps> = ({isLogin, onSubmit}) => {
  const initialValues = isLogin
    ? {email: '', password: ''}
    : {email: '', password: '', confirmPassword: ''};
  const {colors} = useTheme();

  const handleSubmit = async (
    values: AuthFormValues,
    actions: FormikHelpers<AuthFormValues>,
  ) => {
    onSubmit(values, actions);
    actions.setSubmitting(false);
    Keyboard.dismiss();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={isLogin ? loginSchema : signupSchema}>
      {({
        handleSubmit,
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        isSubmitting,
        status,
      }) => (
        <View style={styles.container}>
          <LabelInput
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            label="Email"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="john@example.com">
            <Ionicons name="mail" size={20} color={colors.secondary500} />
          </LabelInput>
          <LabelInput
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            label="Password"
            autoComplete="new-password"
            // placeholder="********"
            secureTextEntry>
            <MaterialIcons name="lock" size={22} color={colors.secondary500} />
          </LabelInput>
          {!isLogin && (
            <LabelInput
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              // placeholder="********"
              label="Confirm Password"
              autoComplete="new-password"
              secureTextEntry>
              <MaterialIcons
                name="lock-check"
                size={22}
                color={colors.secondary500}
              />
            </LabelInput>
          )}

          <View style={[styles.button, {opacity: isSubmitting ? 0.4 : 1}]}>
            {status?.generalError &&
              <AppText
                variant="bold"
                style={{textAlign: 'center', color: colors.error, fontSize: ms(14), marginBottom: vs(5)}}>
                {status?.generalError}
              </AppText>
            }
            <Button onPress={handleSubmit} disabled={isSubmitting}>
              {isLogin ? 'Login' : 'Signup'}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  button: {
    marginTop: 30,
  },
});
