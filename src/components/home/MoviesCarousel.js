import {useState} from 'react';
import {
  Image,
  ImageBackground,
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import ENDPOINT from '../../utils/Constants';
import GlobalStyles from '../../utils/GlobalStyles';

const {width} = Dimensions.get('window');

// try adding title and other things beneath
const renderItem = ({item}) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{uri: ENDPOINT.image + item.poster_path}}
        style={styles.cardImage}
      />
      <View style={{marginTop: 15, alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontFamily: GlobalStyles.fontRegular, color: 'white', textAlign: 'center'}} ellipsizeMode='tail' numberOfLines={2}>{item.title}</Text>
        {/* <Text>{item.release_date}</Text> */}
      </View>
    </View>
  );
};

function MoviesCarousel({movies}) {
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  console.log(activeMovieIndex);

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
      resizeMode='cover'
    >
      <LinearGradient colors={['transparent', '#303234']} locations={[0.5, 0.9]} style={{marginTop: StatusBar.currentHeight + 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity>
            <Text style={{fontSize: 35, fontFamily: GlobalStyles.fontBold, color: 'white'}}>
              <Text>Movie</Text>
              <Text style={{color: GlobalStyles.secondary500}}>Corn</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Carousel
          data={movies}
          renderItem={renderItem}
          itemWidth={width - 150}
          sliderWidth={width}
          onBeforeSnapToItem={handleSnapToItem}
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    width: '85%',
    height: '80%',
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: GlobalStyles.secondary500,
    borderRadius: 20,
  },
});
