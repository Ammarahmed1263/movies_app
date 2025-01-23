import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import { useTheme } from '@contexts/ThemeContext';
import ListCard from '@molecules/ListCard';
import MovieListItem from '@molecules/MovieListItem';
import { removeList } from '@services/listsService';
import { height, hs, ms } from '@styles/metrics';
import { capitalizeInput } from '@utils';
import { FC, useLayoutEffect, useRef } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  ActionSheetRef,
  SheetManager,
} from 'react-native-actions-sheet';
import {
  Gesture,
  GestureDetector
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListDetailsScreenProps } from 'types/listsStackTypes';
import { Movie } from 'types/movieTypes';

const HEADER_HEIGHT = height / 1.8;
const SNAP_POINTS = [0, -HEADER_HEIGHT];

const ListDetailsScreen: FC<ListDetailsScreenProps> = ({route, navigation}) => {
  const {title, movies, id} = route.params.listData;
  const {colors} = useTheme();
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

  const renderItem = ({item}: {item: Movie}) => (
    <MovieListItem movie={item} disabled>
      <View style={{flexDirection: 'row'}}>
        <Icon name="heart-outline" size={25} color={colors.paleShade} />
        <Icon name="trash" size={25} color={colors.paleShade} />
      </View>
    </MovieListItem>
  );

  return (
    <>
      <View style={[styles.container, {backgroundColor: colors.primary500}]}>
        <Animated.FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={contentContainerStyle}
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
    aspectRatio: 1,
    borderRadius: 0,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hs(20),
  },
});

export default ListDetailsScreen;
