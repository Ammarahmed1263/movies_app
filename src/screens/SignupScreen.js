import AuthContent from "../components/auth/AuthContent";

function SignupScreen({navigation}) {
  return <AuthContent isLogin={false} navigation={navigation}/>;
}

export default SignupScreen;