import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "../ui/Button";
import LabelInput from "../ui/LabelInput";

function AuthForm({ isLogin }) {
  return (
    <View style={styles.container}>
      <View>
        <LabelInput label='Username'/>
        <LabelInput label='Password'/>
        {!isLogin && <LabelInput label='Confirm Password'/>}
      </View>

      <View style={styles.button}>
        <Button>Login</Button>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 40
  },
  button: {
    marginTop: 75
  }
})