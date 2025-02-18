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
import {hs, ms, vs} from '@styles/metrics';
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
        <View
          style={[
            styles.container,
            {gap: Object.keys(errors).length > 0 ? 0 : vs(20)},
          ]}>
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
            <View>
              <MaterialIcons
                name="lock"
                size={22}
                color={colors.secondary500}
              />
            </View>
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
                variant="body"
                style={{
                  ...styles.error,
                  color: colors.error,
                }}>
                {status?.generalError}
              </AppText>
            )}
          </View>
          <Button
            onPress={handleSubmit}
            disabled={isSubmitting}
            pressableStyle={{flex: 1}}
            style={{
              minHeight: vs(50),
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

          <View style={styles.continue}>
            <View style={[styles.line, {borderColor: colors.paleShade}]} />
            <AppText variant="light" style={styles.contText}>
              Or continue with
            </AppText>
            <View style={[styles.line, {borderColor: colors.paleShade}]} />
          </View>

          <Button
            style={{
              ...styles.google,
              borderColor: colors.secondary500,
            }}
            customView
            onPress={() => {}}
            flat>
            <View style={styles.googleContainer}>
              <View
                style={{
                  width: 25,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                  borderRadius: 13,
                }}
              />
              <AppText variant="body">Google</AppText>
            </View>
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    marginTop: vs(10),
    gap: vs(10),
  },
  continue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    borderTopWidth: vs(1),
  },
  google: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: ms(1),
    minHeight: vs(50),
    marginTop: vs(5),
  },
  googleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hs(5),
  },
  contText: {
    marginHorizontal: hs(4),
  },
  button: {
    // marginBottom: -20,
  },
  error: {
    textAlign: 'center',
    marginBottom: vs(5),
  },
});
