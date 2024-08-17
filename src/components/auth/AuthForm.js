import {View, StyleSheet, Keyboard, ScrollView} from 'react-native';
import Button from '../ui/Button';
import LabelInput from '../ui/LabelInput';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
;

function AuthForm({isLogin}) {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View>
        <LabelInput label="Username" cursorColor={colors.secondary600} placeholder='e.g. Username_001'>
          <Ionicons name="person" size={20} color={colors.secondary500} />
        </LabelInput>
        <LabelInput label="Password" cursorColor={colors.secondary600} placeholder="********">
          <MaterialIcons name="lock" size={22} color={colors.secondary500} />
        </LabelInput>
        {!isLogin && (
          <LabelInput
            placeholder="********"
            label="Confirm Password"
            cursorColor={colors.secondary600}>
            <MaterialIcons
              name="lock-check"
              size={22}
              color={colors.secondary500}
            />
          </LabelInput>
        )}
      </View>

      <View style={styles.button}>
        <Button>
          {isLogin ? 'Login' : 'Signup'}
        </Button>
      </View>
    </ScrollView>
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
