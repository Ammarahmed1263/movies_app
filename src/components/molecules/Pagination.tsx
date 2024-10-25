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
  dotsLength: number;
  scrollProgress: SharedValue<number>;
  activeDotIndex: number;
  inactiveDotOpacity?: number;
  inactiveDotScale?: number;
  dotStyle: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
  inactiveDotStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  setActiveIndex: (index: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  dotsLength,
  scrollProgress,
  activeDotIndex,
  inactiveDotOpacity = 1,
  inactiveDotScale = 1,
  dotStyle,
  activeDotStyle,
  inactiveDotStyle,
  containerStyle,
  setActiveIndex,
  ...props
}) => {
  const { colors } = useTheme();
  const dotWidth = ((dotStyle as ViewStyle)?.width ?? 16) as number;
  console.log('scroll: ', scrollProgress.value)
  return (
    <Animated.View style={[styles.paginationContainer, containerStyle]}>
      {Array.from({ length: dotsLength }, (_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const width = interpolate(
            scrollProgress.value,
            [index - 1, index, index + 1],
            [dotWidth * inactiveDotScale, dotWidth, dotWidth * inactiveDotScale],
            Extrapolation.CLAMP
          )

          const opacity = interpolate(
            scrollProgress.value,
            [index - 1, index, index + 1],
            [inactiveDotOpacity, 1, inactiveDotOpacity],
            Extrapolation.CLAMP
          )

          const backgroundColor = interpolateColor(
            scrollProgress.value,
            [index - 1, index, index + 1],
            [colors.primary700, colors.secondary500, colors.primary700],
          )

          return {
            width,
            backgroundColor,
            opacity,
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
            // { opacity: index === activeDotIndex ? 1 : inactiveDotOpacity },
            {            
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4
            },
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
