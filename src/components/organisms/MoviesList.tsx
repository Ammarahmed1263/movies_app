import {
  Keyboard, StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import { FC, useRef, useState } from 'react';
import MovieCard from '@molecules/MovieCard';
import { Movie } from 'types/movieTypes';
import { useTheme } from '@contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { FlatListPropsWithLayout, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AppButton from '@atoms/AppButton';
import { height, hs, vs } from '@styles/metrics';
import { ReanimatedScrollEvent } from 'react-native-reanimated/lib/typescript/hook/commonTypes';

interface MoviesListProps extends Omit<FlatListPropsWithLayout<Movie>, 'renderItem'> {
  containerStyle?: ViewStyle;
  snapStyle?: ViewStyle;
  renderItem?: ({ item }: { item: Movie }) => JSX.Element;
}

const MoviesList: FC<MoviesListProps> = ({
  containerStyle,
  snapStyle,
  renderItem,
  ...props
}) => {
  const [showSnapButton, setShowSnapButton] = useState(false);
  const { colors } = useTheme();
  const flatListRef = useRef<Animated.FlatList<Movie>>(null);
  const snapButtonOpacity = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const handleSnapButton = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    scrollY.value = 0;
    snapButtonOpacity.value = 0;
    setShowSnapButton(false);
  }

  const handleOnScrollBeginDrag = () => {
    Keyboard.dismiss();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: snapButtonOpacity.value
    };
  })

  const scrollHandler = useAnimatedScrollHandler((event: ReanimatedScrollEvent) => {
    scrollY.value = event.contentOffset.y;

    if (scrollY.value > height * 0.5 && !showSnapButton) {
      runOnJS(setShowSnapButton)(true);
      snapButtonOpacity.value = withTiming(1, { duration: 1000 });
    } else if (scrollY.value <= height * 0.5 && showSnapButton) {
      snapButtonOpacity.value = withTiming(0, { duration: 500 });
      runOnJS(setShowSnapButton)(false);
    }
  });

  const defaultRenderItem = ({ item }: { item: Movie }) => (
    <MovieCard
      movie={item}
      style={{
        margin: hs(10),
      }}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
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
        onEndReachedThreshold={0.4}
        contentContainerStyle={{ marginBottom: 10 }}
        {...props}
      />
      {showSnapButton && <Animated.View style={animatedStyle}>
        <AppButton
          onPress={handleSnapButton}
          disableRipple
          style={[styles.snapButton, snapStyle || {}, { backgroundColor: colors.link }]}>
          <Icon name="arrow-up" color={colors.paleShade} size={30} />
        </AppButton>
      </Animated.View>}
    </View>
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: hs(10)
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
    elevation: 10
  },
});
