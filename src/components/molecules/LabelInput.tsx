import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {useTheme} from '@contexts/ThemeContext';
import {FC, ReactNode} from 'react';
import AppText from '@atoms/AppText';
import {hs, ms, vs} from '@styles/metrics';

interface LabelInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  label: string;
  error?: string;
  touched?: boolean;
  children: ReactNode;
}

const LabelInput: FC<LabelInputProps> = ({
  containerStyle,
  label,
  children,
  error,
  touched,
  ...props
}) => {
  const {colors, fonts} = useTheme();
  
  return (
    <View style={[styles.container, {marginVertical: vs((error && touched)? 2 : 10)}, containerStyle]}>
      <AppText
        variant="bold"
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
          borderColor: (error && touched) ? colors.error : colors.secondary600,
        }}>
        <View style={{paddingHorizontal: 8, paddingBottom: 3}}>{children}</View>
        <TextInput
          placeholderTextColor={colors.primary700}
          autoCapitalize="none"
          cursorColor={colors.secondary600}
          style={{
            ...styles.textInput,
            fontFamily: fonts.regular.fontFamily,
            color: colors.paleShade,
          }}
          {...props}
        />
      </View>
      {(error && touched) && (
        <AppText 
          variant="body"
          numberOfLines={1}
          style={{
            ...styles.errorText,
            color: colors.error,
          }}>
          {error}
        </AppText>
      )}
    </View>
  );
};

export default LabelInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: hs(5),
  },
  label: {
    fontSize: 16,
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
  errorText: {
    fontSize: ms(14),
    paddingStart: hs(6),
    paddingTop: vs(2),
  },
});
