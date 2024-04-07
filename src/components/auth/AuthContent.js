import {StyleSheet, View, Text} from 'react-native';
import AuthForm from './AuthForm';
import Button from '../ui/Button';
import {useTheme} from '../../store/context/ThemeContext';

function AuthContent({isLogin}) {
  const {colors, fonts} = useTheme();

  return (
    <View style={styles.container}>
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
          <Button flat textStyle={styles.footerText}>
            {isLogin ? 'register' : 'Login'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 5,
  },
  footerText: {
    fontSize: 16,
    marginHorizontal: 4,
  },
});
