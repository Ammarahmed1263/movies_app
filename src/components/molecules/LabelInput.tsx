import {Text, TextInput, View, StyleSheet, ViewStyle, TextInputProps} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { FC, ReactNode } from 'react';
import AppText from '@atoms/AppText';

interface LabelInputProps extends TextInputProps{
  containerStyle?: ViewStyle
  label: string
  children: ReactNode
}

const LabelInput: FC<LabelInputProps> = ({containerStyle, label, children, ...props}) => {
  const {colors, fonts} = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <AppText
        variant='bold'
        style={{
          ...styles.label,
          color: colors.paleShade,
        }}>
        {label}
      </AppText>
      <View
        style={{
          ...styles.input,
          backgroundColor: colors.primary600,
          borderColor: colors.secondary600,
        }}>
        <View style={{paddingHorizontal: 8, paddingBottom: 3}}>{children}</View>
        <TextInput
          placeholderTextColor={colors.primary700}
          autoCapitalize='none'
          cursorColor={colors.secondary600}
          style={{
            ...styles.textInput,
            fontFamily: fonts.regular.fontFamily,
            color: colors.paleShade,
          }}
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
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16
  },
  input: {
    borderRadius: 15,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  textInput: {
    flex: 1,
  },
});
