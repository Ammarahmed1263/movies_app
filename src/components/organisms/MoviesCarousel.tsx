import {FC, useRef, useState} from 'react';
import {ImageBackground, View, StyleSheet, StatusBar, I18nManager} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import Pagination from '@molecules/Pagination';
import {useTheme} from '@contexts/ThemeContext';
import {getImageUrl} from '@utils/index';
import {Movie, MovieArray} from 'types/movieTypes';
import {hs, vs, width} from '@styles/metrics';
import AppText from '@atoms/AppText';
import MovieCard from '@molecules/MovieCard';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface MoviesCarouselProps {
  movies: MovieArray;
}

const MoviesCarousel: FC<MoviesCarouselProps> = ({movies}) => {
  const [activeMovieIndex, setActiveMovieIndex] = useState<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const {colors} = useTheme();

  const handleSnapToItem = (index: number) => {
    setActiveMovieIndex(index);
  };

  const handleDotPress = (index: number) => {
    setActiveMovieIndex(index);
    if (carouselRef.current) {
      carouselRef?.current?.scrollTo({index});
    }
  };

  const renderItem = ({
    item,
    index,
    animationValue,
  }: {
    item: Movie;
    index: number;
    animationValue: SharedValue<number>;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0.4, 1, 0.4],
        Extrapolation.CLAMP,
      );

      return {
        opacity,
      };
    });

    return (
      <Animated.View style={[styles.carouselItem, animatedStyle]}>
        <MovieCard
          titleVariant="subheading"
          movie={item}
          key={index + item.id}
          style={styles.carouselItem}
          ImageViewStyle={{
            height: '87%',
          }}
          hideVote
        />
      </Animated.View>
    );
  };

  if (!movies || movies.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <AppText>Loading...</AppText>
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
          <View style={styles.appName}>
            <AppText
              variant="heading"
              style={{
                fontSize: 35,
                color: colors.paleShade,
              }}>
              Movie
            </AppText>
            <AppText
              variant="heading"
              style={{color: colors.secondary500, fontSize: 25}}>
              Corn
            </AppText>
          </View>
        </View>

        <Carousel
          ref={carouselRef}
          data={movies}
          renderItem={renderItem}
          width={width}
          defaultIndex={activeMovieIndex}
          style={{
            flex: 1,
            height: vs(390),
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: width / 2 - hs(5),
            parallaxAdjacentItemScale: 0.87,
          }}
          onSnapToItem={handleSnapToItem}
          pagingEnabled
        />

        <Pagination
          containerStyle={{marginTop: -10}}
          dotsLength={movies.length}
          activeDotIndex={activeMovieIndex}
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 8,
            backgroundColor: colors.secondary500,
          }}
          inactiveDotStyle={{backgroundColor: colors.primary700}}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.4}
          setActiveIndex={handleDotPress}
        />
      </LinearGradient>
    </ImageBackground>
  );
};

export default MoviesCarousel;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    minHeight: vs(400),
  },
  gradientContainer: {
    marginTop: StatusBar?.currentHeight ?? 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appName: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'baseline',
  },
  carouselItem: {
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 10,
    aspectRatio: 8.5 / 16,
    alignSelf: 'center',
  },
});
