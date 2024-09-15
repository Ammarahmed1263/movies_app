import {FC, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  I18nManager,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Carousel, {
//   Pagination,
// } from 'react-native-snap-carousel';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import Pagination from '@molecules/Pagination';
import CarouselItem from '@molecules/CarouselItem';
import {useTheme} from '@contexts/ThemeContext';
import {getImageUrl} from '@utils/index';
import {Movie} from 'types/movieTypes';
import { vs } from '@styles/metrics';

const {width} = Dimensions.get('window');

const renderItem = ({item, index}: {item: Movie; index: number}) => {
  return <CarouselItem item={item} key={index + item.id}/>;
};

interface MoviesCarouselProps {
  movies: Movie[];
}

const MoviesCarousel: FC<MoviesCarouselProps> = ({movies}) => {
  const [activeMovieIndex, setActiveMovieIndex] = useState<number>(0);
  const {colors, fonts} = useTheme();

  const handleSnapToItem = (index: number) => {
    setActiveMovieIndex(index);
  };

  // modify with better one
  if (!movies || movies.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ImageBackground
      source={{uri: getImageUrl(movies[activeMovieIndex].poster_path)}}
      blurRadius={45}
      style={styles.backgroundImage}
      resizeMode="cover">
      <LinearGradient
        colors={['transparent', colors.primary500]}
        style={styles.gradientContainer}>
        <View style={styles.headerContainer}>
          <Text
            style={{
              ...styles.headerText,
              fontFamily: fonts.bold,
              color: colors.paleShade,
            }}>
            <Text>Movie</Text>
            <Text style={{color: colors.secondary500, fontSize: 29}}>Corn</Text>
          </Text>
        </View>
        {/* <Carousel
          data={movies}
          renderItem={renderItem}
          itemWidth={width - 175}
          sliderWidth={width}
          onBeforeSnapToItem={handleSnapToItem}
          // inactiveSlideScale={0.86}
          // inverted={I18nManager.isRTL}
          // autoplay
          inactiveSlideOpacity={0.5}
          inactiveSlideScale={0.85}
          loop
        /> */}
        <Carousel
          data={movies}
          renderItem={renderItem}
          width={width}
          style={{
            flex: 1,
            width: width,
            height: width * 1.1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 170,
            parallaxAdjacentItemScale: 0.85,
          }}
          onSnapToItem={handleSnapToItem}
          pagingEnabled
        />
        <Pagination
          containerStyle={{marginTop: -10}}
          dotsLength={movies.length}
          activeDotIndex={activeMovieIndex}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: colors.secondary500,
          }}
          inactiveDotStyle={{backgroundColor: colors.primary700}}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.4}
        />
      </LinearGradient>
    </ImageBackground>
  );
};

export default MoviesCarousel;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    minHeight: vs(400)
  },
  gradientContainer: {
    marginTop: StatusBar?.currentHeight ?? 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 35,
  },
});
