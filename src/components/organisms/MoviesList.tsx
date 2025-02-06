import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {FC, useRef, useState} from 'react';
import MovieCard from '@molecules/MovieCard';
import {Movie, MovieSummary} from 'types/movieTypes';
import {useTheme} from '@contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AppButton from '@atoms/AppButton';
import {height, hs, vs} from '@styles/metrics';

interface MoviesListProps
  extends Omit<FlatListProps<MovieSummary>, 'renderItem'> {
  containerStyle?: ViewStyle;
  snapStyle?: ViewStyle;
  renderItem?: ({item}: {item: MovieSummary}) => JSX.Element;
}

const MoviesList: FC<MoviesListProps> = ({
  containerStyle,
  snapStyle,
  renderItem,
  ...props
}) => {
  const {colors} = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const snapButtonOpacity = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const defaultRenderItem = ({item}: {item: MovieSummary}) => (
    <MovieCard movie={item as Movie} />
  );

  const handleOnScrollBeginDrag = () => {
    Keyboard.dismiss();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(snapButtonOpacity.value, {duration: 500}),
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;

      if (event.contentOffset.y > height * 0.5) {
        snapButtonOpacity.value = withTiming(1, {duration: 500});
      } else {
        snapButtonOpacity.value = withTiming(0, {duration: 500});
      }
    },
  });

  const handleSnapButton = () => {
    flatListRef.current?.scrollToOffset({offset: 0, animated: true});
    scrollY.value = 0;
    snapButtonOpacity.value = withTiming(0, {duration: 0});
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* @ts-ignore */}
      <Animated.FlatList
        ref={flatListRef}
        renderItem={renderItem ?? defaultRenderItem}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        maxToRenderPerBatch={10}
        initialNumToRender={8}
        windowSize={15}
        onScrollBeginDrag={handleOnScrollBeginDrag}
        onEndReachedThreshold={0.8}
        contentContainerStyle={{marginBottom: 10}}
        {...props}
      />
      <Animated.View style={animatedStyle}>
        <AppButton
          onPress={handleSnapButton}
          style={[
            styles.snapButton,
            snapStyle || {},
            {backgroundColor: colors.link},
          ]}
          customView
          customViewStyle={styles.button}>
          <Icon name="arrow-up" color={colors.paleShade} size={30} />
        </AppButton>
      </Animated.View>
    </View>
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: hs(10),
  },
  snapButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    end: 20,
    bottom: 80,
    width: hs(60),
    height: vs(60),
    borderRadius: hs(30),
    elevation: 10,
  },
  button: {
    width: hs(60),
    height: vs(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
