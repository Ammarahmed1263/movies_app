import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type AuthStackParamList = {
  Login: undefined,
  Signup: undefined
}

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">
export type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, "Signup">