import AppButton from '@atoms/AppButton';
import AppImage from '@atoms/AppImage';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import ListCard from '@molecules/ListCard';
import MovieListItem from '@molecules/MovieListItem';
import {removeList, removeMovieFromlist} from '@services/listsService';
import { addFavoriteMovie, getFavoriteMovies, removeFavoriteMovie } from '@services/userService';
import {height, hs, ms, vs} from '@styles/metrics';
import {capitalizeInput} from '@utils';
import LottieView from 'lottie-react-native';
import {FC, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActionSheetRef, SheetManager} from 'react-native-actions-sheet';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListDetailsScreenProps} from 'types/listsStackTypes';
import {Movie} from 'types/movieTypes';

const HEADER_HEIGHT = height / 1.9;
const SNAP_POINTS = [0, -HEADER_HEIGHT];

const ListDetailsScreen: FC<ListDetailsScreenProps> = ({route, navigation}) => {
  const {title, movies, id} = route.params.listData;
  const {colors} = useTheme();
  const [favorites, setFavorites] = useState<Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>[]>([]);
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});

  const handleRemoveList = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete the whole list?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          isPreferred: true,
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            removeList(Number(id));
            navigation.pop();
          },
        },
      ],
    );
  };

  useEffect(() => {
    const unsubscribe = getFavoriteMovies(favoriteMovies => {
      setFavorites(favoriteMovies);
    })

    return () => unsubscribe();
  }, []);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: capitalizeInput(title),
      headerRight: () => (
        <AppButton variant="body" onPress={handleRemoveList} flat>
          delete
        </AppButton>
      ),
      headerLeft: ({canGoBack}) =>
        canGoBack ? (
          <AppButton onPress={() => navigation.goBack()} flat>
            <Icon name="chevron-back" size={ms(23)} color={colors.paleShade} />
          </AppButton>
        ) : null,
    });
  }, [navigation, route.params.listData]);

  const gesture = Gesture.Pan()
    .enabled(movies.length > 0)
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = Math.max(
        SNAP_POINTS[1],
        Math.min(SNAP_POINTS[0], context.value.y + event.translationY),
      );
    })
    .onEnd(event => {
      const shouldSnap =
        event.velocityY < -500 ||
        (translateY.value < SNAP_POINTS[1] / 2 && event.velocityY >= -500);

      translateY.value = withSpring(
        shouldSnap ? SNAP_POINTS[1] : SNAP_POINTS[0],
        {
          velocity: event.velocityY,
          damping: 20,
        },
      );
    });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const contentContainerStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(
      translateY.value,
      [0, SNAP_POINTS[1]],
      [HEADER_HEIGHT - 15, 0],
    ),
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateY.value, [SNAP_POINTS[1], 0], [0, 1]),
  }));

  const handleToggleFavorite = useCallback(async (item: Movie) => {
    try {
      const wasFavorite = favorites.some(fav => fav.id === item.id);
      
      // Immediately update UI
      setFavorites(prev => 
        wasFavorite 
          ? prev.filter(fav => fav.id !== item.id) // Remove
          : [...prev, item] // Add
      );
  
      // Sync with Firebase
      if (wasFavorite) {
        await removeFavoriteMovie(item.id);
      } else {
        await addFavoriteMovie(item);
      }
    } catch (error) {
      // Revert on error
      setFavorites(prev => 
        prev.filter(fav => fav.id !== item.id)
      );
    }
  }, [favorites]);

  const renderItem = ({item}: {item: Movie}) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);

    return <MovieListItem movie={item}>
      <View style={styles.actionsSection}>
        <AppButton
          onPress={() => handleToggleFavorite(item)}
          customViewStyle={styles.icon}
          customView
          flat>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={25}
            color={isFavorite ? colors.error : colors.primary700}
          />
        </AppButton>

        <AppButton
          onPress={() => removeMovieFromlist(item.id, Number(id))}
          customViewStyle={styles.icon}
          customView
          flat>
          <Icon name="trash-outline" size={25} color={colors.primary700} />
        </AppButton>
      </View>
    </MovieListItem>
  };

  return (
    <>
      <View style={[styles.container, {backgroundColor: colors.primary500}]}>
        <Animated.FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={contentContainerStyle}
          ListEmptyComponent={
            <View style={styles.noMovies}>
              <LottieView
                source={
                  Platform.OS === 'ios'
                    ? require('../assets/lottie/no_search_results(2).json')
                    : require('../assets/lottie/no_search_results.json')
                }
                autoPlay
                loop
                style={{height: vs(160), aspectRatio: 1 / 1}}
              />
              <AppText variant="heading" style={styles.text}>
                No Movies Added
              </AppText>
              <AppText
                variant="body"
                style={{textAlign: 'center', marginBottom: vs(8)}}>
                You can add a movie by clicking on + icon (top right).
              </AppText>
            </View>
          }
        />

        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.header, headerStyle]}>
            <Animated.View style={[styles.imageContainer, opacityStyle]}>
              <ListCard
                data={route.params.listData}
                style={styles.image}
                hasTitle={false}
                disabled
              />
            </Animated.View>

            <Animated.View style={[styles.titleSection, opacityStyle]}>
              <AppText variant="heading">{capitalizeInput(title)}</AppText>

              <TouchableOpacity
                onPress={() => SheetManager.show('add-to-list')}>
                <Icon name="add" size={30} color={colors.paleShade} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionsSection: {
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: hs(4),
    padding: hs(4),
    borderRadius: hs(8),
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 1000,
  },
  imageContainer: {
    height: HEADER_HEIGHT - 80,
    width: '100%',
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 0.95,
    borderRadius: hs(10),
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hs(20),
  },
  noMovies: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: hs(20),
  },
  text: {
    textAlign: 'center',
    marginBottom: vs(8),
  },
});

export default ListDetailsScreen;
