import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import useListAnimation from '@hooks/useListAnimation';
import useOrientation from '@hooks/useOrientation';
import ListCard from '@molecules/ListCard';
import MovieListItem from '@molecules/MovieListItem';
import {
  getListById,
  removeList,
  removeMovieFromlist,
} from '@services/listsService';
import {
  addFavoriteMovie,
  getFavoriteMovies,
  removeFavoriteMovie,
} from '@services/userService';
import {HEADER_HEIGHT, hs, ms, vs} from '@styles/metrics';
import {
  cancelScheduledReminder,
  capitalizeInput,
  scheduleFavoriteReminder,
} from '@utils';
import LottieView from 'lottie-react-native';
import {FC, useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  I18nManager,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Icon = Ionicons as any;
import {ListDetailsScreenProps} from 'types/listsStackTypes';
import {Movie, MovieSummary} from 'types/movieTypes';
import {ListType} from 'types/userTypes';

const ListDetailsScreen: FC<ListDetailsScreenProps> = ({route, navigation}) => {
  const {listId} = route.params;
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [favorites, setFavorites] = useState<
    Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>[]
  >([]);
  const [list, setList] = useState<ListType | null>(null);
  const {isPortrait} = useOrientation();
  const {headerStyle, contentContainerStyle, opacityStyle, gesture} =
    useListAnimation((list?.movies.length ?? 1) > 0 && isPortrait);

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
            removeList(listId);
            navigation.pop();
          },
        },
      ],
    );
  };

  useEffect(() => {
    const unsubscribe = getListById(listId, list => {
      setList(list);
    });

    return () => unsubscribe();
  }, [listId]);

  useEffect(() => {
    const unsubscribe = getFavoriteMovies(favoriteMovies => {
      setFavorites(favoriteMovies);
    });

    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: capitalizeInput(list?.title ?? ''),
      headerRight: () => (
        <AppButton variant="body" onPress={handleRemoveList} flat>
          {t('delete')}
        </AppButton>
      ),
      headerLeft: ({canGoBack}) =>
        canGoBack ? (
          <AppButton onPress={() => navigation.goBack()} flat>
            <Icon
              name={I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
              size={ms(23)}
              color={colors.paleShade}
            />
          </AppButton>
        ) : null,
    });
  }, [navigation, list?.title]);

  const handleToggleFavorite = useCallback(
    async (item: MovieSummary) => {
      try {
        const wasFavorite = favorites.some(fav => fav.id === item.id);

        // Immediately update UI
        setFavorites(
          prev =>
            wasFavorite
              ? prev.filter(fav => fav.id !== item.id) // Remove
              : [...prev, item], // Add
        );

        // Sync with Firebase
        if (wasFavorite) {
          await removeFavoriteMovie(item.id);
          cancelScheduledReminder(item.id);
        } else {
          await addFavoriteMovie(item);
          scheduleFavoriteReminder(item);
        }
      } catch (error) {
        // Revert on error
        setFavorites(prev => prev.filter(fav => fav.id !== item.id));
      }
    },
    [favorites],
  );

  const renderItem = ({item}: {item: MovieSummary}) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);

    return (
      <MovieListItem movie={item}>
        <View style={styles.actionsSection}>
          <AppButton
            onPress={() => handleToggleFavorite(item)}
            customViewStyle={[
              styles.icon,
              {backgroundColor: colors.transparent},
            ]}
            customView
            flat>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={25}
              color={isFavorite ? colors.error : colors.primary700}
              style={{marginEnd: -1}}
            />
          </AppButton>

          <AppButton
            onPress={() => removeMovieFromlist(item.id, listId)}
            customViewStyle={[
              styles.icon,
              {backgroundColor: colors.transparent},
            ]}
            customView
            flat>
            <Icon
              name="trash-outline"
              size={25}
              color={colors.primary700}
              style={{marginEnd: -1}}
            />
          </AppButton>
        </View>
      </MovieListItem>
    );
  };

  if (!list) {
    return null;
  }

  const header = () => (
    <Animated.View style={[styles.header, headerStyle]}>
      <Animated.View
        style={[
          styles.imageContainer,
          isPortrait && {height: HEADER_HEIGHT * 0.8},
          opacityStyle,
        ]}>
        <ListCard
          data={list}
          style={{...styles.image}}
          hasTitle={false}
          disabled
        />
      </Animated.View>

      <Animated.View style={[styles.titleSection]}>
        <AppText variant="heading">{capitalizeInput(list.title)}</AppText>
        <TouchableOpacity
          onPress={() =>
            SheetManager.show('add-to-list', {
              payload: {
                movies: list?.movies,
                id: list.id,
              },
            })
          }>
          <Icon name="add" size={30} color={colors.paleShade} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.primary500,
          flexDirection: isPortrait ? 'column' : 'row',
        },
      ]}>
      {!isPortrait ? (
        <View style={{width: '40%'}}>{header()}</View>
      ) : (
        <GestureDetector gesture={gesture}>{header()}</GestureDetector>
      )}

      <View
        style={{
          width: isPortrait ? '100%' : '60%',
        }}>
        <Animated.FlatList
          data={list?.movies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={[contentContainerStyle, !isPortrait && {marginTop: 0}]}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: vs(10),
          }}
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
                {t('add_to_list')}
              </AppText>
              <AppText
                variant="body"
                style={{textAlign: 'center', marginBottom: vs(8)}}>
                {t('add_advice')}
              </AppText>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  actionsSection: {
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: hs(4),
    padding: hs(4),
    borderRadius: hs(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: HEADER_HEIGHT,
    zIndex: 1000,
  },
  imageContainer: {
    width: '85%',
    // height: HEADER_HEIGHT * 0.8,
    marginVertical: vs(20),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: hs(10),
    ...Platform.select({
      ios: {
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(15),
    height: HEADER_HEIGHT * 0.1,
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
