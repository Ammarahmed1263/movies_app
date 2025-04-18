import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  Pressable,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {useTheme} from '@contexts/ThemeContext';
import {FC, forwardRef, ReactNode, useState} from 'react';
import AppText from '@atoms/AppText';
import {hs, ms, vs} from '@styles/metrics';
import Icon from 'react-native-vector-icons/Ionicons';
const Ionicons = Icon as any;
import i18n from 'i18n';

interface LabelInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  label: string;
  error?: string;
  touched?: boolean;
  children?: ReactNode;
}

const LabelInput = forwardRef<TextInput, LabelInputProps>(
  (
    {
      containerStyle,
      label,
      children,
      error,
      touched,
      secureTextEntry = false,
      ...props
    },
    ref,
  ) => {
    const {colors, fonts} = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(prev => !prev);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        <AppText
          variant="body"
          style={{
            color: colors.paleShade,
          }}>
          {label}
        </AppText>
        <View
          style={{
            ...styles.input,
            backgroundColor: colors.primary600,
            borderColor: error && touched ? colors.error : colors.secondary600,
          }}>
          <View style={{marginHorizontal: hs(8), paddingBottom: 3}}>
            {children}
          </View>
          <TextInput
            ref={ref}
            placeholderTextColor={colors.primary700}
            autoCapitalize="none"
            cursorColor={colors.secondaryShadow}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            style={{
              ...styles.textInput,
              fontFamily: fonts.regular.fontFamily,
              color: colors.paleShade,
            }}
            {...props}
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={{marginHorizontal: hs(8)}}
              onPress={togglePasswordVisibility}>
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={ms(20)}
                color={colors.primary700}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && touched && (
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
  },
);

export default LabelInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: hs(5),
  },
  input: {
    borderRadius: ms(10),
    borderTopWidth: vs(2),
    borderBottomWidth: vs(2),
    borderWidth: hs(0.5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hs(8),
    minHeight: vs(50),
  },
  textInput: {
    flex: 1,
    textAlign: i18n.language === 'ar' ? 'right' : 'left',
  },
  errorText: {
    paddingStart: hs(6),
    paddingTop: vs(2),
  },
});
