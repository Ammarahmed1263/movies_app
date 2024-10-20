import { useTheme } from '@contexts/ThemeContext';
import { isAction } from '@reduxjs/toolkit';
import { hs, vs } from '@styles/metrics';
import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import Animated, { Easing, Extrapolation, interpolate, interpolateColor, runOnJS, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export interface PaginationProps extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>;
  dotsLength: number;
  activeDotIndex: number;
  setActiveIndex: (index: number) => void;
  dotStyle: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
  inactiveDotStyle?: StyleProp<ViewStyle>;
  inactiveDotOpacity?: number;
  inactiveDotScale?: number;
}

const Pagination: FC<PaginationProps> = ({
  containerStyle,
  dotsLength,
  activeDotIndex,
  activeDotStyle,
  dotStyle,
  inactiveDotStyle,
  inactiveDotOpacity = 1,
  inactiveDotScale = 1,
  setActiveIndex,
  ...props
}) => {
  const { colors } = useTheme();
  const dotWidth = ((dotStyle as ViewStyle)?.width ?? 16) as number;

  return (
    <Animated.View style={[styles.paginationContainer, containerStyle]}>
      {Array.from({ length: dotsLength }, (_, index) => {
        const animatedStyle = useAnimatedStyle(() => {

          const width = withTiming(index === activeDotIndex ? dotWidth : dotWidth * inactiveDotScale, { duration: 800 });

          const backgroundColor = withTiming(index === activeDotIndex ? colors.secondary500 : colors.primary700, { duration: 1100 });

          return {
            width,
            backgroundColor,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
          };
        })

        return <TouchableOpacity
          key={index}
          disabled={activeDotIndex === index}
          hitSlop={7}
          onPress={() => setActiveIndex(index)}
          {...props}
        >
          <Animated.View style={[
            { opacity: index === activeDotIndex ? 1 : inactiveDotOpacity },
            dotStyle,
            animatedStyle
          ]} />
        </TouchableOpacity>
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vs(20),
  },
});

export default Pagination;
