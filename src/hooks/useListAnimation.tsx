import {HEADER_HEIGHT, SNAP_POINTS} from '@styles/metrics';
import {useEffect, useMemo} from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import createPanGesture from 'utils/createPanGesture';
import useOrientation from './useOrientation';

const useListAnimation = (isGestureEnabled: boolean) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const {orientation, isPortrait} = useOrientation();

  useEffect(() => {
    if (orientation === 'landscape') {
      translateY.value = 0;
    }
  }, [orientation]);

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value * 0.85}],
  }));

  const contentContainerStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(
      translateY.value,
      [0, SNAP_POINTS[1]],
      [isPortrait ? HEADER_HEIGHT : 0, HEADER_HEIGHT * 0.15],
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
