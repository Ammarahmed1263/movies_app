import {FC, useEffect, useRef, useState} from 'react';
import {ImageBackground, View, StyleSheet, StatusBar, I18nManager, useWindowDimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import Pagination from '@molecules/Pagination';
import {useTheme} from '@contexts/ThemeContext';
import {getImageUrl} from '@utils';
import {Movie, MovieArray} from 'types/movieTypes';
import {height, hs, vs } from '@styles/metrics';
import AppText from '@atoms/AppText';
import MovieCard from '@molecules/MovieCard';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { imagePlaceHolder } from '../../constants';

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

interface MoviesCarouselProps {
  movies: MovieArray;
  loading?: boolean;
  time_window?: 'day' | 'week';
  length?: number;
}

const MoviesCarousel: FC<MoviesCarouselProps> = ({movies, loading, length = 8}) => {
  const [activeMovieIndex, setActiveMovieIndex] = useState<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const scrollProgress = useSharedValue(0);
  const { width } = useWindowDimensions();
  const {colors} = useTheme();
  const { t } = useTranslation();

  const handleSnapToItem = (index: number) => {
    setActiveMovieIndex(index);
  };

  const handleDotPress = (index: number) => {
    setActiveMovieIndex(index);
    if (carouselRef.current) {
      carouselRef?.current?.scrollTo({index});
    }
  };
  const handleProgressChange = (_: number, absoluteProgress: number) => {
    scrollProgress.value = absoluteProgress;
  }

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
      <Animated.View key={item.id.toString()} style={[styles.carouselItem, animatedStyle]}>
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

  if (loading || movies.length === 0) {
    return (
      <View style={{height: height * 0.5,alignItems: 'center', justifyContent: 'center'}}>
        <AppText variant="heading">Loading...</AppText>
      </View>
    );
  }

  return (
    <ImageBackground
      source={getImageUrl(movies[activeMovieIndex].poster_path) ?? imagePlaceHolder.MOVIE}
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
              {t('movie')}
            </AppText>
            <AppText
              variant="heading"
              style={{color: colors.secondary500, fontSize: 25}}>
              {t('corn')}
            </AppText>
          </View>
        </View>

        <Carousel
          ref={carouselRef}
          data={movies.length > length ? movies.slice(0, length) : movies}
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
            parallaxScrollingOffset: width * 0.47,
            parallaxAdjacentItemScale: 0.88,
          }}
          onSnapToItem={handleSnapToItem}
          onProgressChange={handleProgressChange}
          pagingEnabled
          // loop
          // autoPlay
        />

        <Pagination
          dotsLength={movies.length > length ? length : movies.length}
          activeDotIndex={activeMovieIndex}
          scrollProgress={scrollProgress}
          dotStyle={{
            width: hs(36),
            height: vs(8),
            borderRadius: hs(6),
            backgroundColor: colors.secondary500,
            marginHorizontal: hs(6)
          }}
          activeDotStyle={{width: hs(36)}}
          inactiveDotStyle={{backgroundColor: colors.primary700}}
          inactiveDotOpacity={0.3}
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
  carouselItem: {
    flex: 1,
    paddingTop: 10,
    aspectRatio: 8.5 / 16,
    alignSelf: 'center',
  },
  gradientContainer: {
    marginTop: StatusBar?.currentHeight ?? 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appName: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

});
