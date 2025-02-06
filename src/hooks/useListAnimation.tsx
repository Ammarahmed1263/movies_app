import { HEADER_HEIGHT, SNAP_POINTS } from '@styles/metrics';
import { useMemo } from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import createPanGesture from 'utils/createPanGesture';

const useListAnimation = (isGestureEnabled: boolean) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});

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

  const gesture = useMemo(
    () => createPanGesture(translateY, context, isGestureEnabled),
    [isGestureEnabled],
  );

  return {
    translateY,
    context,
    headerStyle,
    contentContainerStyle,
    opacityStyle,
    gesture,
  };
};

export default useListAnimation;
