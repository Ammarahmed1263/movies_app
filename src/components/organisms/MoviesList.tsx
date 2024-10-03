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
import {Movie} from 'types/movieTypes';
import {useTheme} from '@contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import AppButton from '@atoms/AppButton';
import { height, hs, vs } from '@styles/metrics';

interface MoviesListProps extends Omit<FlatListProps<Movie>, 'renderItem'> {
  containerStyle?: ViewStyle;
  renderItem?: ({item}: {item: Movie}) => JSX.Element;
}

const MoviesList: FC<MoviesListProps> = ({
  containerStyle,
  renderItem,
  ...props
}) => {
  const {colors} = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const snapButtonOpacity = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const handleSnapButton = () => {
    flatListRef.current?.scrollToOffset({offset: 0, animated: true});  
  }

  const defaultRenderItem = ({item}: {item: Movie}) => (
    <MovieCard
      movie={item}
      style={{
        margin: hs(10),
      }}
    />
  );

  const handleOnScrollBeginDrag = () => {
    Keyboard.dismiss();
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(snapButtonOpacity.value, {duration: 500}),
    };
  })

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;

    if (scrollY.value > height * 0.5) {
      snapButtonOpacity.value = 1;
    } else {
      snapButtonOpacity.value = 0;
    }
  };


  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        ref={flatListRef}
        renderItem={renderItem ?? defaultRenderItem}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onScrollBeginDrag={handleOnScrollBeginDrag}
        onEndReachedThreshold={0.4}
        maxToRenderPerBatch={10}
        contentContainerStyle={{marginBottom: 10}}
        {...props}
      />
      <Animated.View style={animatedStyle}>
        <AppButton
          onPress={handleSnapButton}
          style={[styles.snapButton, {backgroundColor: colors.link}]}>
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
