import {
  Pressable,
  Text,
  StyleSheet,
  View,
  TextStyle,
  ViewStyle,
  PressableProps,
} from 'react-native';
import {useTheme} from '@contexts/ThemeContext';
import {FC, ReactNode, useState} from 'react';
import AppText from './AppText';
import {FontVariants} from 'types/themeTypes';
import { hs, ms } from '@styles/metrics';

interface AppButtonProps extends PressableProps{
  flat?: boolean;
  variant?: FontVariants;
  textStyle?: TextStyle;
  style?: ViewStyle | ViewStyle[];
  onPress: () => void;
  customView?: ReactNode;
  customViewStyle?: ViewStyle | ViewStyle[];
  children?: ReactNode;
}

const AppButton: FC<AppButtonProps> = ({
  flat = false,
  variant = 'bold',
  textStyle,
  style,
  children,
  onPress,
  customView,
  customViewStyle,
  ...props
}) => {
  const {colors} = useTheme();
  const [clicked, setClicked] = useState(false);

  const pressAction = () => {
    onPress && onPress();
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };
  return (
    <View
      style={[
        styles.buttonContainer,
        {backgroundColor: colors.secondary500},
        style,
        !flat && clicked && {opacity: 0.5},
        flat && {backgroundColor: '', elevation: 0},
      ]}>
      <Pressable
        android_ripple={flat ? null : {color: colors.secondary600}}
        hitSlop={ms(15)}
        style={[
          styles.general,
          !flat && styles.innerButton,
          flat && clicked && {opacity: 0.7},
        ]}
        onPress={pressAction}
        {...props}
        >
        {customView ? (
          <View style={customViewStyle}>{children}</View>
        ) : (
          <AppText
            variant={variant}
            style={StyleSheet.flatten([
              styles.text,
              {
                color: colors.paleShade,
              },
              flat && {color: colors.secondary500},
              textStyle,
            ])}>
            {children}
          </AppText>
        )}
      </Pressable>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: hs(8),
    margin: hs(2),
    overflow: 'hidden',
  },
  general: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerButton: {
    padding: hs(10),
  },
  text: {
    textTransform: 'capitalize',
  },
});
