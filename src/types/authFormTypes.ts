import { FormikHelpers } from "formik";

export type AuthFormValues = {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (values: AuthFormValues, actions: FormikHelpers<AuthFormValues>) => Promise<void>;
}