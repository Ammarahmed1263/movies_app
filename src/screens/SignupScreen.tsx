import AuthContent from "@organisms/AuthContent";
import { FC } from "react";
import { SignupScreenProps } from "types/authStackTypes";

const SignupScreen: FC<SignupScreenProps> = ({navigation}) => {
  return <AuthContent isLogin={false} navigation={navigation}/>;
}

export default SignupScreen;