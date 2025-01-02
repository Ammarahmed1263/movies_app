import {useTheme} from '@contexts/ThemeContext';
import {FC, ReactNode} from 'react';
import {I18nManager, Platform, Text, TextProps, TextStyle} from 'react-native';
import { FontVariants } from 'types/themeTypes';

interface AppTextProps extends TextProps {
  variant?: FontVariants;
  style?: TextStyle | TextStyle[];
  children?: ReactNode;
}
const AppText: FC<AppTextProps> = ({
  children,
  style,
  variant = 'regular',
  ...props
}) => {
  const { colors, fonts} = useTheme();
  const fontStyles = fonts[variant];
  
  return (
    <Text
      style={[
        {
          color: colors.paleShade,
          fontFamily: fontStyles.fontFamily,
          fontSize: fontStyles.fontSize,
          // textAlign: I18nManager.isRTL ? 'right' : 'left',
          fontWeight:
            Platform.OS === 'android'
              ? 'normal'
              : (fontStyles.fontWeight as TextStyle['fontWeight']),
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default AppText;
