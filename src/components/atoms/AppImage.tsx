import {hs} from '@styles/metrics';
import {FC, useState} from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {
  FastImageProps,
  ImageStyle as FastImageStyle,
} from 'react-native-fast-image';
import {imagePlaceHolder} from '../../constants';
import AppLoading from './AppLoading';

interface AppImageProps
  extends Omit<ImageProps & FastImageProps, 'source' | 'style'> {
  source?: ImageSourcePropType | string;
  placeholder?: 'movie' | 'person';
  viewStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ImageStyle>;
  loadingSize?: 'small' | 'large';
}

const AppImage: FC<AppImageProps> = ({
  source,
  placeholder = 'movie',
  loadingSize = 'large',
  viewStyle,
  style,
  onLoadEnd,
  ...props
}) => {
  const imageHolder =
    placeholder === 'movie' ? imagePlaceHolder.MOVIE : imagePlaceHolder.PERSON;
  const [isLoading, setIsLoading] = useState(true);
  console.log('type of: ', typeof source, 'source: ', source);

  const handleLoadEnd = () => {
    setIsLoading(false);
    onLoadEnd?.();
  };

  const imageStyle = [
    styles.image,
    style,
    isLoading ? {opacity: 0} : undefined,
  ];

  const isRemoteString = typeof source === 'string';

  const fastImageSource = isRemoteString
    ? {
        uri: source,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }
    : undefined;

  const fallbackSource = !isRemoteString && source ? source : imageHolder;

  return (
    <View style={[styles.container, viewStyle]}>
      {isLoading && (
        <AppLoading
          size={loadingSize === 'small' ? hs(25) : hs(35)}
          speed={2}
          source={require('../../assets/lottie/loading_fade.json')}
        />
      )}

      {isRemoteString ? (
        <FastImage
          source={fastImageSource}
          style={imageStyle as StyleProp<FastImageStyle>}
          onLoadEnd={handleLoadEnd}
          resizeMode={FastImage.resizeMode.cover}
          {...props}
        />
      ) : (
        <Image
          source={fallbackSource}
          style={imageStyle}
          onLoadEnd={handleLoadEnd}
          {...props}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    overflow: 'hidden',
    position: 'absolute',
  },
});

export default AppImage;
