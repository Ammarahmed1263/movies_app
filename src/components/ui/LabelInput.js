import {Text, TextInput, View, StyleSheet} from 'react-native';
import {useTheme} from '../../store/context/ThemeContext';

function LabelInput({containerStyle, label, children, ...props}) {
  const {colors, fonts} = useTheme();
  console.log(props);
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
      <View
        style={{
          ...styles.input,
          backgroundColor: colors.primary600,
          borderColor: colors.secondary600,
        }}>
        <View style={{paddingHorizontal: 8}}>{children}</View>
        <TextInput
          style={{...styles.textInput, fontFamily: fonts.regular, color: colors.paleShade}}
          {...props}
        />
      </View>
    </View>
  );
}

export default LabelInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5
  },
  label: {
    fontSize: 18,
  },
  input: {
    borderRadius: 15,
    borderTopWidth: 1.6,
    borderBottomWidth: 1.6,
    borderWidth: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 15
  }
});
