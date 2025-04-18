import Button from '@atoms/AppButton';
import AuthForm from '@molecules/AuthForm';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';

import AppImage from '@atoms/AppImage';
import AppText from '@atoms/AppText';
import {isIOS} from '@constants';
import {useTheme} from '@contexts/ThemeContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {hs, ms, vs} from '@styles/metrics';
import {FormikHelpers} from 'formik';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {AuthFormValues} from 'types/authFormTypes';
import {AuthStackParamList} from 'types/authStackTypes';

interface AuthContentProps {
  isLogin: boolean;
  onSubmit: (
    values: AuthFormValues,
    actions: FormikHelpers<AuthFormValues>,
  ) => Promise<void>;
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login' | 'Signup'>;
}

const AuthContent: FC<AuthContentProps> = ({isLogin, navigation, onSubmit}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <View style={styles.headingContainer}>
            <AppImage
              source={require('../../assets/images/round_logo.png')}
              viewStyle={styles.logo}
              resizeMode="contain"
            />
            <AppText
              variant="heading"
              style={{
                color: colors.paleShade,
              }}>
              {isLogin ? t('login_title') : t('register_title')}
            </AppText>
            <AppText
              variant="body"
              style={{
                ...styles.subHeading,
                color: colors.primary700,
              }}>
              {isLogin ? t('login_subtitle') : t('register_subtitle')}
            </AppText>
          </View>

          <AuthForm isLogin={isLogin} onSubmit={onSubmit} />

          <View style={styles.footerContainer}>
            <AppText
              variant="regular"
              style={{
                ...styles.footerText,
                color: colors.paleShade,
              }}>
              {isLogin ? t('dont_have_account') : t('already_have_account')}
            </AppText>
            <Button
              flat
              textStyle={styles.footerText}
              onPress={() => navigation.replace(isLogin ? 'Signup' : 'Login')}>
              {isLogin ? t('register_here') : t('login_here')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
  },
  headingContainer: {
    alignItems: 'center',
  },
  logo: {
    width: hs(120),
    aspectRatio: 1,
    marginBottom: vs(10),
  },
  subHeading: {
    marginTop: vs(2),
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: hs(20),
  },
  footerText: {
    marginHorizontal: hs(4),
    fontSize: ms(14),
  },
});
