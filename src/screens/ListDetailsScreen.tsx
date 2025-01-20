import AppButton from '@atoms/AppButton';
import {useTheme} from '@contexts/ThemeContext';
import FavoriteCard from '@molecules/FavoriteCard';
import ListCard from '@molecules/ListCard';
import MoviesList from '@organisms/MoviesList';
import {removeList} from '@services/listsService';
import {ms, vs, width} from '@styles/metrics';
import {FC, useLayoutEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListDetailsScreenProps} from 'types/listsStackTypes';
import {Movie} from 'types/movieTypes';

const ListDetailsScreenScreen: FC<ListDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {listData} = route.params;
  const {colors} = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isLocked, setIsLocked] = useState(false);

  const HEADER_MAX_HEIGHT = width - ms(40);
  const HEADER_MIN_HEIGHT = 0;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

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
            removeList(Number(listData?.id));
            navigation.pop();
          },
        },
      ],
    );
  };

  const handleScroll = (event: {nativeEvent: {contentOffset: {y: number}}}) => {
    if (!isLocked && event.nativeEvent.contentOffset.y > HEADER_MAX_HEIGHT) {
      setIsLocked(true);
    }
  };

  const handleRenderItem = ({item}: {item: Movie}) => {
    console.log('item; ', item);
    return <FavoriteCard movie={item} />;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: listData?.title,
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
  }, [navigation, listData]);

  if (!listData) {
    return <ActivityIndicator size="large" color={colors.paleShade} />;
  }

  return (
    <View style={{flex: 1}}>
      {!isLocked && (
        <Animated.ScrollView
          style={{...styles.addContent, height: headerHeight}}
          contentContainerStyle={{alignItems: 'center'}}
          scrollEnabled={!!listData.movies.length}
          showsVerticalScrollIndicator={false}
          bounces={headerHeight}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: false,
              listener: handleScroll,
            },
          )}>
          <ListCard
            data={listData}
            style={{...styles.listImage, width: HEADER_MAX_HEIGHT}}
            disabled
            hasTitle={false}
          />
        </Animated.ScrollView>
      )}

      <MoviesList
        data={[...listData?.movies]}
        renderItem={handleRenderItem}
        contentContainerStyle={{
          paddingTop: vs(20),
        }}
      />
    </View>
  );
};

export default ListDetailsScreenScreen;

const styles = StyleSheet.create({
  addContent: {
    overflow: 'hidden',
    flexGrow: 0,
    flexShrink: 1,
  },
  listImage: {
    flex: 1,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    marginTop: 0,
  }
});
