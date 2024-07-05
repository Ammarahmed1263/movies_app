import {View, Image, Text, StyleSheet} from 'react-native';
import ENDPOINT from '../../utils/Constants';
import {useTheme} from '../../store/context/ThemeContext';
import MovieButton from '../ui/MovieButton';
import { useNavigation } from '@react-navigation/native';

function CarouselItem({item}) {
  const navigation = useNavigation();
  const {colors, fonts} = useTheme();

  return (
    <MovieButton style={styles.cardContainer} onPress={() => navigation.navigate('MovieStack',{screen: 'MovieDetails', params: {id: item.id}})}>
      <View
        style={{...styles.innerContainer, borderColor: colors.secondary600}}>
        <Image
          source={{uri: ENDPOINT.image + item.poster_path}}
          style={styles.cardImage}
        />
      </View>
      <Text
        style={{
          ...styles.title,
          fontFamily: fonts.regular,
          color: colors.paleShade,
        }}
        ellipsizeMode="tail"
        numberOfLines={1}>
        {item.title}
      </Text>
    </MovieButton>
  );
}

export default CarouselItem;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    minHeight: 400,
  },
  innerContainer: {
    width: '100%',
    height: '87%',
    borderTopWidth: 2.6,
    borderBottomWidth: 2.6,
    borderWidth: 1.2,
    borderRadius: 20,
    overflow: 'hidden'
  },
  cardImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 21,
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    alignSelf: 'center',
  },
});
