import {useState, FC, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  ImageProps,
  ViewStyle,
  ImageStyle,
  ImageURISource,
  ImageSourcePropType,
} from 'react-native';
import {useTheme} from '@contexts/ThemeContext';
import {imagePlaceHolder} from '../../constants';
import LottieView from 'lottie-react-native';
import AppLoading from './AppLoading';
import { hs } from '@styles/metrics';

interface AppImageProps extends ImageProps {
  source?: ImageSourcePropType | undefined;
  placeholder?: string;
  viewStyle?: ViewStyle;
  style?: ImageStyle;
  loadingSize?: 'small' | 'large';
}

const AppImage: FC<AppImageProps> = ({
  source,
  placeholder = 'movie',
  loadingSize = 'large',
  viewStyle,
  style,
  ...props
}) => {
  const imageHolder =
    placeholder === 'movie' ? imagePlaceHolder.MOVIE : imagePlaceHolder.PERSON;
  const [isLoading, setIsLoading] = useState(true);


  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, viewStyle]}>
      {isLoading && (
        <AppLoading
          size={loadingSize === 'small' ? hs(20) : hs(35)}
          speed={2.5}
          style={{position: 'absolute'}}
          source={require('../../assets/lottie/loading_fade.json')}
        />
      )}

      <Image
        source={source || imageHolder}
        style={[styles.image, style, {opacity: isLoading ? 0 : 1}]}
        onLoadEnd={handleLoadEnd}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '102%',
    height: '102%',
    resizeMode: 'cover',
  },
});

export default AppImage;
