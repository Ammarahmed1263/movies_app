import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import AuthForm from '@molecules/AuthForm';
import Button from '@atoms/AppButton';

import {useTheme} from '@contexts/ThemeContext';
import {FC} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'types/authStackTypes';
import AppText from '@atoms/AppText';
import { AuthFormValues } from 'types/authFormTypes';
import { FormikHelpers } from 'formik';

interface AuthContentProps {
  isLogin: boolean;
  onSubmit: (values: AuthFormValues, actions: FormikHelpers<AuthFormValues>) => Promise<void>;
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login' | 'Signup'>;
}

const AuthContent: FC<AuthContentProps> = ({isLogin, navigation, onSubmit}) => {
  const {colors} = useTheme();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <View>
            <AppText
              variant="heading"
              style={{
                color: colors.paleShade,
              }}>
              {isLogin ? 'Welcome Back' : 'Create New Account'}
            </AppText>
            <AppText
              variant="body"
              style={{
                ...styles.subHeading,
                color: colors.paleShade,
              }}>
              {isLogin ? 'Login' : 'Signup'} to continue
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
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </AppText>
            <Button
              flat
              textStyle={styles.footerText}
              onPress={() => navigation.replace(isLogin ? 'Signup' : 'Login')}>
              {isLogin ? 'register' : 'Login'}
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
    width: '84%',
  },
  subHeading: {
    position: 'absolute',
    top: 38,
    left: 4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  footerText: {
    marginHorizontal: 4,
    fontSize: 14,
  },
});
