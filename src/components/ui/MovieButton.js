import {Pressable, View, StyleSheet} from 'react-native';
import GlobalStyles from '../../utils/GlobalStyles';

function MovieButton({children, style}) {
  // when clicked pass movie id to retrieve it's data
  return (
    <Pressable
      style={({pressed}) => [
        styles.pressableContainer,
        style,
        pressed && {opacity: 0.5},
      ]}
      >
      {children}
    </Pressable>
  );
}

export default MovieButton;

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: 1.7,
    borderRadius: 20,
    borderColor: GlobalStyles.secondary600,
  },
});
