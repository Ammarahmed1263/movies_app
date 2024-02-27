import {Pressable, Text, StyleSheet, View} from 'react-native';
import GlobalStyles from '../../utils/GlobalStyles';

function Button({ flat, textStyle, children }) {
  return (
    <View style={[styles.buttonContainer, flat && {backgroundColor: '', elevation: 0}]}>
      <Pressable 
        android_ripple={flat ? null : {color: GlobalStyles.secondary500}}
        style={[!flat && styles.innerButton]}
      >
        <Text style={[styles.text, textStyle, flat && styles.flatText]}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: GlobalStyles.secondary600,
    borderRadius: 25,
    elevation: 6,
    overflow: 'hidden',
  },
  innerButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: GlobalStyles.fontBold,
    color: GlobalStyles.paleWhite,
    textTransform: 'capitalize'
  },
  flatText: {
    color: GlobalStyles.secondary600
  }
});
