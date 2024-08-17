import {useState} from 'react';
import { ImageBackground, View, Text, Dimensions, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ENDPOINT from '../../utils/Constants';
import CarouselItem from './CarouselItem';
import { useTheme } from '../../context/ThemeContext';

const {width} = Dimensions.get('window');

// isolate item
const renderItem = ({item}) => {
  return <CarouselItem item={item} />;
};

function MoviesCarousel({movies}) {
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const { colors, fonts } = useTheme();

  // modify with better one
  if (movies.length === 0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleSnapToItem = index => {
    setActiveMovieIndex(index);
  };

  return (
    <ImageBackground
      source={{uri: ENDPOINT.image + movies[activeMovieIndex].poster_path}}
      blurRadius={45}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['transparent', colors.primary500]}
        style={styles.gradientContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={{ ...styles.headerText, fontFamily: fonts.bold, color: colors.paleShade }}>
            <Text>Movie</Text>
            <Text style={{color: colors.secondary500, fontSize: 29}}>Corn</Text>
          </Text>
        </View>
        <Carousel
          data={movies}
          renderItem={renderItem}
          itemWidth={width - 175}
          sliderWidth={width}
          onBeforeSnapToItem={handleSnapToItem}
          inactiveSlideScale={0.86}
          // autoplay={true}
          loop={true}
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
          inactiveDotStyle={{
            width: 6,
            height: 6,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </LinearGradient>
    </ImageBackground>
  );
}

export default MoviesCarousel;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    minHeight: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    marginTop: StatusBar.currentHeight + 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 35,
  },
});
