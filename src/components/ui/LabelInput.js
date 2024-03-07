import { Text, TextInput, View, StyleSheet } from "react-native";
import GlobalStyles from "../../utils/GlobalStyles";

function LabelInput({ containerStyle, label, props }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input}/>
    </View>
  );
}

export default LabelInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  label: {
    fontSize: 16,
    fontFamily: GlobalStyles.fontBold,
    color: GlobalStyles.paleWhite
  },
  input: {
    borderRadius: 15,
    backgroundColor: GlobalStyles.primary600,
    borderColor: GlobalStyles.secondary600,
    borderWidth: 2
  }
})