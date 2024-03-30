import { StyleSheet, View, Text } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import AuthForm from './AuthForm';
import Button from '../ui/Button';

function AuthContent({isLogin}) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.heading}>
            {isLogin ? 'Welcome Back' : 'Create New Account'}
          </Text>
          <Text style={styles.subHeading}>
            {isLogin ? 'Login' : 'Signup'} to continue
          </Text>
        </View>
        <AuthForm isLogin={isLogin} />

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{isLogin ? "Don't have an account?" : 'Already have an account?'}</Text>
          <Button flat textStyle={styles.footerText}>
            {isLogin ? 'register' : 'Login'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthContent;

// modify to be adjustable on different screen sizes
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
    fontFamily: GlobalStyles.fontBold,
    fontSize: 30,
    color: GlobalStyles.paleWhite,
  },
  subHeading: {
    fontFamily: GlobalStyles.fontRegular,
    fontSize: 17,
    color: '#rgba(255, 255, 255, 0.7)',
    position: 'absolute',
    top: 38,
    left: 4
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 5
  },
  footerText: {
    fontSize: 16,
    color: GlobalStyles.paleWhite,
    marginHorizontal: 4,
    fontFamily: GlobalStyles.fontRegular
  }
});
