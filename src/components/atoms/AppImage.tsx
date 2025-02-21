import {hs} from '@styles/metrics';
import {FC, useState} from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ActivityIndicator,
  ImageStyle,
} from 'react-native';
import {imagePlaceHolder} from '../../constants';
import AppLoading from './AppLoading';
import FastImage, {ImageStyle as FastImageStyle} from 'react-native-fast-image';

interface AppImageProps extends Omit<ImageProps, 'source' | 'style'> {
  source?: ImageSourcePropType;
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

  const handleLoadEnd = () => {
    setIsLoading(false);
    onLoadEnd?.();
  };

  const imageStyle = [
    styles.image,
    style,
    isLoading ? {opacity: 0} : undefined,
  ];

  return (
    <View style={[styles.container, viewStyle]}>
      {isLoading && (
        <AppLoading
          size={loadingSize === 'small' ? hs(25) : hs(35)}
          speed={2.5}
          // containerStyle={{backgroundColor: 'red'}}
          source={require('../../assets/lottie/loading_fade.json')}
        />
      )}

      {typeof source === 'string' ? (
        <FastImage
          source={{
            uri: source,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={imageStyle as StyleProp<FastImageStyle>}
          onLoadEnd={handleLoadEnd}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <Image
          source={source || imageHolder}
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
