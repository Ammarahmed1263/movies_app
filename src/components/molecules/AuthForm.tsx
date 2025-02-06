import {FC, useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '@atoms/AppButton';
import LabelInput from './LabelInput';
import {useTheme} from '@contexts/ThemeContext';
import {Formik, FormikErrors, FormikHelpers} from 'formik';
import {AuthFormProps, AuthFormValues} from 'types/authFormTypes';
import {loginSchema, signupSchema} from '@validation';
import AppText from '@atoms/AppText';
import {ms, vs} from '@styles/metrics';
import AppLoading from '@atoms/AppLoading';
import {useFocusEffect} from '@react-navigation/native';

const AuthForm: FC<AuthFormProps> = ({isLogin, onSubmit}) => {
  const initialValues = isLogin
    ? {email: '', password: ''}
    : {email: '', password: '', confirmPassword: ''};
  const {colors} = useTheme();
  const emailRef = useRef<TextInput>(null);

  const handleSubmit = async (
    values: AuthFormValues,
    actions: FormikHelpers<AuthFormValues>,
  ) => {
    await onSubmit(values, actions);
    actions.setSubmitting(false);
  };

  useFocusEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  });

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
            ref={emailRef}
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

          <View style={styles.button}>
            {status?.generalError && (
              <AppText
                variant="bold"
                style={{
                  textAlign: 'center',
                  color: colors.error,
                  fontSize: ms(14),
                  marginBottom: vs(5),
                }}>
                {status?.generalError}
              </AppText>
            )}
            <Button
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting
                  ? colors.transparent
                  : colors.secondary500,
              }}>
              {isSubmitting ? (
                <AppLoading
                  source={require('../../assets/lottie/loading_fade.json')}
                  size={30}
                  speed={1.5}
                />
              ) : isLogin ? (
                'Login'
              ) : (
                'Signup'
              )}
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
