import {FC, ReactNode} from 'react'
import {Pressable, View, StyleSheet, TextStyle, ViewStyle, PressableProps, GestureResponderEvent, StyleProp, PressableStateCallbackType} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface MovieCardButtonProps extends PressableProps{
  style?:  StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>),
  children: ReactNode,
  onPress: ((event: GestureResponderEvent) => void) | null
}

const MovieCardButton: FC<MovieCardButtonProps> = ({children, style, onPress, ...props}) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={(state) => [
        styles.pressableContainer,
        { borderColor: colors.secondary600 },
        typeof style === 'function' ? style(state) : style,
        { opacity: state.pressed ? 0.5 : 1 },
      ]}
      {...props}
      >
      {children}
    </Pressable>
  );
}

export default MovieCardButton;

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    overflow: 'hidden',
  },
});
