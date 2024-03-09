import {Pressable, View, StyleSheet} from 'react-native';
import GlobalStyles from '../../utils/GlobalStyles';

function MovieButton({children}) {
  return (
    <View style={styles.movieContainer}>
      {/* when clicked pass movie id to retrieve it's data */}
      <Pressable
        style={({pressed}) => [
          styles.pressableContainer,
          pressed && {opacity: 0.5},
        ]}>
        {children}
      </Pressable>
    </View>
  );
}

export default MovieButton;

const styles = StyleSheet.create({
  movieContainer: {
    borderRadius: 20,
    marginHorizontal: 10,
    width: 160,
    height: 230,
  },
  pressableContainer: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: 1.7,
    borderRadius: 20,
    borderColor: GlobalStyles.secondary600,
  },
});
