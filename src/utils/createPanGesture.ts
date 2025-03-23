import {SNAP_POINTS} from '@styles/metrics';
import {Gesture} from 'react-native-gesture-handler';
import {SharedValue, withSpring} from 'react-native-reanimated';

const createPanGesture = (
  translateY: SharedValue<number>,
  context: SharedValue<{y: number}>,
  enabled: boolean,
) => {
  return Gesture.Pan()
    .enabled(enabled)
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
};

export default createPanGesture;
