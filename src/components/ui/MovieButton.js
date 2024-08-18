import {Pressable, View, StyleSheet} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

function MovieButton({children, style, onPress}) {
  const { colors } = useTheme();
  // when clicked pass movie id to retrieve it's data
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

export default MovieButton;

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    overflow: 'hidden',
  },
});
