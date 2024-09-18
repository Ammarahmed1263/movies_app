import {FC, ReactNode} from 'react'
import {Pressable, View, StyleSheet, TextStyle} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface MovieCardButtonProps {
  style?: TextStyle,
  children: ReactNode,
  onPress: () => void
}

const MovieCardButton: FC<MovieCardButtonProps> = ({children, style, onPress}) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.pressableContainer,
        {borderColor: colors.secondary600},
        style,
        pressed && {opacity: 0.5},
      ]}>
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
