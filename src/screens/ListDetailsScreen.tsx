import AppButton from '@atoms/AppButton';
import {useTheme} from '@contexts/ThemeContext';
import FavoriteCard from '@molecules/FavoriteCard';
import ListCard from '@molecules/ListCard';
import MoviesList from '@organisms/MoviesList';
import {removeList} from '@services/listsService';
import {height, hs, ms, vs, width} from '@styles/metrics';
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

  const HEADER_MAX_HEIGHT = width;
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
        <Animated.View
          style={{...styles.addContent, height: headerHeight}}>
          <ListCard
            data={listData}
            style={{...styles.listImage}}
            disabled
            hasTitle={false}
          />
        </Animated.View>
      )}

      <MoviesList
        data={[...listData?.movies]}
        renderItem={handleRenderItem}
        contentContainerStyle={{
          paddingTop: vs(20),
          paddingBottom: listData?.movies?.length <= 4 ? vs(450) : 0,
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
            // listener: handleScroll,
          },
        )}
      />
    </View>
  );
};

export default ListDetailsScreenScreen;

const styles = StyleSheet.create({
  addContent: {
    width: width,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listImage: {
    width: width,
    aspectRatio: 1 / 1,
    marginTop: 0,
  }
});
