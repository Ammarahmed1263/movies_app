import { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle, View } from 'react-native';
import LottieView, { AnimationObject } from 'lottie-react-native';

interface AppLoadingProps {
  size?: number;
  source: string | AnimationObject | { uri: string } | undefined;
  speed?: number;
  style?: StyleProp<ViewStyle>;
}

const AppLoading: FC<AppLoadingProps> = ({ size = 40, source, speed = 1, style }) => {
  return (
    <View style={[styles.loadingContainer, style]}>
      <LottieView
        style={{ ...styles.loading, width: size, height: size }}
        source={source}
        speed={speed}
        autoPlay
        loop
      />
    </View>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
});
