import AppButton from '@atoms/AppButton';
import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import {isIOS} from '@constants';
import {useTheme} from '@contexts/ThemeContext';
import useFavoriteMovies from '@hooks/useFavoriteMovies';
import useListAnimation from '@hooks/useListAnimation';
import useOrientation from '@hooks/useOrientation';
import MovieListItem from '@molecules/MovieListItem';
import ListHeader from '@organisms/ListHeader';
import {deleteFromCloudinary} from '@services/cloudinaryService';
import {
  getListById,
  removeList,
  removeMovieFromlist,
} from '@services/listsService';
import {hs, ms, vs} from '@styles/metrics';
import {capitalizeInput, getPublicId} from '@utils';
import LottieView from 'lottie-react-native';
import {FC, useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, I18nManager, SafeAreaView, StyleSheet, View} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ListDetailsScreenProps} from 'types/listsStackTypes';
import {MovieSummary} from 'types/movieTypes';
import {ListType} from 'types/userTypes';
const Icon = Ionicons as any;

const ListDetailsScreen: FC<ListDetailsScreenProps> = ({route, navigation}) => {
  const {listId} = route.params;
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {favorites, toggleFavoriteMovie} = useFavoriteMovies();
  console.log('favorites here: ', favorites);

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
          onPress: async () => {
            await removeList(listId);
            await deleteFromCloudinary(
              getPublicId((list?.poster_path as string) ?? ''),
            );
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

  const renderItem = useCallback(
    ({item}: {item: MovieSummary}) => {
      const isFavorite = favorites.some(fav => fav.id === item.id);
      return (
        <MovieListItem movie={item}>
          <View style={styles.actionsSection}>
            <AppButton
              onPress={() => toggleFavoriteMovie(item)}
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
    },
    [favorites, toggleFavoriteMovie, colors, listId],
  );

  if (!list) {
    return (
      <AppLoading
        source={require('../assets/lottie/loading_fade.json')}
        size={80}
        speed={2}
      />
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.primary500,
          flexDirection: isPortrait ? 'column' : 'row',
        },
      ]}>
      <GestureDetector gesture={gesture}>
        {
          <ListHeader
            list={list}
            headerStyle={[!isPortrait && {width: '40%'}, headerStyle]}
            opacityStyle={opacityStyle}
          />
        }
      </GestureDetector>

      <View
        style={{
          width: isPortrait ? '100%' : '60%',
        }}>
        <Animated.FlatList
          data={list?.movies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          style={contentContainerStyle}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: vs(10),
          }}
          ListEmptyComponent={
            <View style={styles.noMovies}>
              <LottieView
                source={
                  isIOS
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
  },
  actionsSection: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: hs(4),
    padding: hs(4),
    borderRadius: hs(8),
    justifyContent: 'center',
    alignItems: 'center',
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
