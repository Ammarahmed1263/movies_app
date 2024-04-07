import {Text, TextInput, View, StyleSheet} from 'react-native';
import {useTheme} from '../../store/context/ThemeContext';

function LabelInput({containerStyle, label, props}) {
  const {colors, fonts} = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        style={{
          ...styles.label,
          fontFamily: fonts.bold,
          color: colors.paleShade,
        }}>
        {label}
      </Text>
      <TextInput
        {...props}
        style={{
          ...styles.input,
          backgroundColor: colors.primary600,
          borderColor: colors.secondary600,
        }}
      />
    </View>
  );
}

export default LabelInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderRadius: 15,
    borderTopWidth: 1.6,
    borderBottomWidth: 1.6,
    borderWidth: 0.7,
  },
});
