import {hs} from '@styles/metrics';
import {FC, useState} from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {imagePlaceHolder} from '../../constants';
import AppLoading from './AppLoading';

interface AppImageProps extends ImageProps {
  source?: ImageSourcePropType;
  placeholder?: 'movie' | 'person';
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
          size={loadingSize === 'small' ? hs(25) : hs(35)}
          speed={2.5}
          // containerStyle={{backgroundColor: 'red'}}
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
