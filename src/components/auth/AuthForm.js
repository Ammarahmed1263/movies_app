import {View, StyleSheet} from 'react-native';
import Button from '../ui/Button';
import LabelInput from '../ui/LabelInput';
import {useNavigation} from '@react-navigation/native';

function AuthForm({isLogin}) {
  const navigation = useNavigation();
  console.log(isLogin);

  return (
    <View style={styles.container}>
      <View>
        <LabelInput label="Username" />
        <LabelInput label="Password" />
        {!isLogin && <LabelInput label="Confirm Password" />}
      </View>

      <View style={styles.button}>
        <Button
          onPress={() => navigation.navigate(isLogin ? 'Signup' : 'Login')}>
          {isLogin ? 'Login' : 'Signup'}
        </Button>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  button: {
    marginTop: 75,
  },
});
