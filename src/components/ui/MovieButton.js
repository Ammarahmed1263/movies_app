import {Pressable, View, StyleSheet} from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';

function MovieButton({children, style, onPress}) {
  // when clicked pass movie id to retrieve it's data
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.pressableContainer,
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
    borderColor: GlobalStyles.secondary600,
  },
});
