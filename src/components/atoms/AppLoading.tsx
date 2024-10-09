import {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle, View} from 'react-native';
import LottieView, {AnimationObject} from 'lottie-react-native';

interface AppLoadingProps {
  size?: number;
  source: string | AnimationObject | {uri: string} | undefined;
  speed?: number;
  style?: StyleProp<ViewStyle>;
}

const AppLoading: FC<AppLoadingProps> = ({size = 40, source, speed = 1, style}) => {
  return (
    <LottieView
      style={[styles.loading, style, {width: size, height: size}]}
      source={source}
      speed={speed}
      autoPlay
      loop
    />
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  loading: {
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
});
