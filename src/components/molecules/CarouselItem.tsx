import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@contexts/ThemeContext';
import MovieCardButton from '@atoms/MovieCardButton/MovieCardButton';
import { getImageUrl } from '@utils';
import { FC } from 'react';
import { Movie } from 'types/movieTypes';
import { hs, vs } from '@styles/metrics';
import Image from '@atoms/AppImage'

interface CarouselItemProps {
  item: Movie
}

const CarouselItem: FC<CarouselItemProps> = ({item}) => {
  const navigation = useNavigation();
  const {colors, fonts} = useTheme();

  return (
    <MovieCardButton style={styles.cardContainer} onPress={() => navigation.navigate('MovieDetails', {id: item.id})}>
      <View
        style={{...styles.innerContainer, borderColor: colors.secondary600}}>
        <Image
          uri={getImageUrl(item.poster_path)}
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
    </MovieCardButton>
  );
}

export default CarouselItem;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    width: hs(210),
    alignSelf: 'center'
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