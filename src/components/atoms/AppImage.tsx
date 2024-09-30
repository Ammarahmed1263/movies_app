import React, { useState } from 'react';
import { Image, StyleSheet, View, ActivityIndicator, ImageProps, ViewStyle, ImageStyle, ImageURISource, ImageSourcePropType } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { imagePlaceHolder } from '../../constants';


interface AppImageProps extends ImageProps {
  source?: ImageSourcePropType | undefined;
  placeholder?: string;
  viewStyle?: ViewStyle;
  style?: ImageStyle;
}

const AppImage: React.FC<AppImageProps> = ({ source, placeholder= 'movie', viewStyle, style, ...props }) => {
  const imageHolder = placeholder === 'movie' ? imagePlaceHolder.MOVIE : imagePlaceHolder.PERSON;
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, viewStyle]}>
      {isLoading && (
        <ActivityIndicator style={styles.loading} size="small" color={colors.secondary500} />
      )}

      <Image
        source={source || imageHolder}
        style={[styles.image, style, isLoading ? { opacity: 0 } : { opacity: 1 }]}
        onLoadEnd={() => setIsLoading(false)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '102%',
    height: '102%',
    resizeMode: 'cover',
  },
  loading: {
    position: 'absolute',
  },
});

export default AppImage;
