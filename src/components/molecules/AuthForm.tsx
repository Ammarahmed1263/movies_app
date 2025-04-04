import Button from '@atoms/AppButton';
import AppImage from '@atoms/AppImage';
import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {hs, ms, vs} from '@styles/metrics';
import {loginSchema, signupSchema} from '@validation';
import {Formik, FormikHelpers} from 'formik';
import {FC, useRef} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthFormProps, AuthFormValues} from 'types/authFormTypes';
import LabelInput from './LabelInput';
import {onGoogleButtonPress} from '@services/authService';
import {useTranslation} from 'react-i18next';
const Ionicons = Icon as any;
const MaterialIcons = Icon2 as any;

const AuthForm: FC<AuthFormProps> = ({isLogin, onSubmit}) => {
  const initialValues: AuthFormValues = isLogin
    ? {email: '', password: ''}
    : {email: '', password: '', confirmPassword: ''};
  const {colors} = useTheme();
  const {t} = useTranslation();
  const emailRef = useRef<TextInput>(null);

  const handleSubmit = async (
    values: AuthFormValues,
    actions: FormikHelpers<AuthFormValues>,
  ) => {
    await onSubmit(values, actions);
    actions.setSubmitting(false);
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
        setSubmitting,
        setValues,
      }) => {
        return (
          <View
            style={[
              styles.container,
              {gap: Object.keys(errors).length > 0 ? vs(2) : vs(20)},
            ]}>
            <LabelInput
              ref={emailRef}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              label={t('email')}
              autoComplete="email"
              keyboardType="email-address"
              placeholder={t('empty_email')}>
              <Ionicons name="mail" size={20} color={colors.secondary500} />
            </LabelInput>
            <LabelInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
              touched={touched.password}
              label={t('password')}
              autoComplete="new-password"
              secureTextEntry>
              <MaterialIcons
                name="lock"
                size={22}
                color={colors.secondary500}
              />
            </LabelInput>
            {!isLogin && (
              <LabelInput
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                label={t('confirm_password')}
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
              pressableStyle={{flex: 1, width: '100%'}}
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
                t('login')
              ) : (
                t('signup')
              )}
            </Button>
            <View style={styles.continue}>
              <View style={[styles.line, {borderColor: colors.paleShade}]} />
              <AppText variant="light" style={styles.contText}>
                {t('or_continue_with')}
              </AppText>
              <View style={[styles.line, {borderColor: colors.paleShade}]} />
            </View>

            <Button
              style={{
                ...styles.google,
                borderColor: colors.secondary500,
                backgroundColor: 'transparent',
              }}
              customView
              customViewStyle={styles.googleContainer}
              pressableStyle={{
                flex: 1,
                width: '100%',
              }}
              onPress={() => onGoogleButtonPress(setValues, setSubmitting)}>
              <Image
                source={require('../../assets/images/google.png')}
                style={{
                  width: hs(20),
                  height: vs(20),
                }}
                resizeMode="contain"
              />
              <AppText variant="body">{t('google')}</AppText>
            </Button>
          </View>
        );
      }}
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
    gap: hs(8),
    margin: hs(10),
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
