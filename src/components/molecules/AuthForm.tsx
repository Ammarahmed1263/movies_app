import {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '@atoms/AppButton';

import LabelInput from './LabelInput';
import {useTheme} from '@contexts/ThemeContext';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: ({email, password}: {email: string; password: string}) => void;
}

const AuthForm: FC<AuthFormProps> = ({isLogin, onSubmit}) => {
  const [userCredentials, setUserCredentials] = useState({email: '', password: '', confirmPassword: ''});
  const {colors} = useTheme();

  const handleSubmit = () => {
    onSubmit({email: userCredentials.email, password: userCredentials.password});  
  }

  return (
    <View style={styles.container}>
      <View>
        <LabelInput
          value={userCredentials.email}
          onChangeText={email => setUserCredentials({...userCredentials, email})}
          label="Email"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="john@example.com">
          <Ionicons name="mail" size={20} color={colors.secondary500} />
        </LabelInput>
        <LabelInput
          value={userCredentials.password}
          onChangeText={password => setUserCredentials({...userCredentials, password})}
          label="Password"
          autoComplete="new-password"
          // placeholder="********"
          secureTextEntry>
          <MaterialIcons name="lock" size={22} color={colors.secondary500} />
        </LabelInput>
        {!isLogin && (
          <LabelInput
            value={userCredentials.confirmPassword}
            onChangeText={confirmPassword => setUserCredentials({...userCredentials, confirmPassword})}
            // placeholder="********"
            label="Confirm Password"
            autoComplete="new-password"
            secureTextEntry>
            <MaterialIcons
              name="lock-check"
              size={22}
              color={colors.secondary500}
            />
          </LabelInput>
        )}
      </View>

      <View style={styles.button}>
        <Button onPress={handleSubmit}>{isLogin ? 'Login' : 'Signup'}</Button>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  button: {
    marginTop: 50,
  },
});
