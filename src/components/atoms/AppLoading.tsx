import {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle, View} from 'react-native';
import LottieView, {
  AnimationObject,
  LottieViewProps,
} from 'lottie-react-native';
import {useTheme} from '@contexts/ThemeContext';

interface AppLoadingProps extends LottieViewProps {
  size?: number;
  source: string | AnimationObject | {uri: string};
  speed?: number;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const AppLoading: FC<AppLoadingProps> = ({
  size = 40,
  source,
  speed = 1.5,
  style,
  containerStyle,
  ...props
}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <LottieView
        style={[styles.loading, style, {width: size, height: size}]}
        source={source}
        speed={speed}
        autoPlay
        loop
        colorFilters={[
          {
            keypath: 'Layer 4',
            color: colors.secondary500,
          },
          {
            keypath: 'Layer 3',
            color: colors.secondary500,
          },
          {
            keypath: 'Layer 2',
            color: colors.secondary500,
          },
          {
            keypath: 'Layer 1',
            color: colors.secondary500,
          },
        ]}
        {...props}
      />
    </View>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
});
