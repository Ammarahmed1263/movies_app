import {StyleSheet, View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import AuthForm from '@molecules/AuthForm';
import Button from '@atoms/AppButton/AppButton';
import { useTheme } from '@contexts/ThemeContext';
import { FC } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'types/authStackTypes';

interface AuthContentProps {
  isLogin: boolean
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login' | 'Signup'>
}

const AuthContent: FC<AuthContentProps> = ({isLogin, navigation}) => {
  const {colors, fonts} = useTheme();

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <View>
            <Text
              style={{
                ...styles.heading,
                fontFamily: fonts.bold,
                color: colors.paleShade,
              }}>
              {isLogin ? 'Welcome Back' : 'Create New Account'}
            </Text>
            <Text
              style={{
                ...styles.subHeading,
                color: colors.paleShade,
                fontFamily: fonts.regular,
              }}>
              {isLogin ? 'Login' : 'Signup'} to continue
            </Text>
          </View>
          <AuthForm isLogin={isLogin} />

          <View style={styles.footerContainer}>
            <Text
              style={{
                ...styles.footerText,
                color: colors.paleShade,
                fontFamily: fonts.regular,
              }}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <Button flat textStyle={styles.footerText} onPress={() => navigation.replace(isLogin ? 'Signup' : 'Login')}>
              {isLogin ? 'register' : 'Login'}
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
  heading: {
    fontSize: 30,
  },
  subHeading: {
    fontSize: 17,
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
    fontSize: 16,
    marginHorizontal: 4,
  },
});
