import React, { useState } from 'react';
import { Image, StyleSheet, View, ActivityIndicator, ImageProps } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

enum imagePlaceHolder {
  PERSON = require('../../../assets/images/person_placeholder.png'),
  MOVIE = require('../../../assets/images/movie_placeholder.png'),
}

interface AppImageProps extends ImageProps {
  uri: string | undefined;
  placeholder?: string;
}

const AppImage: React.FC<AppImageProps> = ({ uri, placeholder= 'movie', style, ...rest }) => {
  const imageHolder = placeholder === 'movie' ? imagePlaceHolder.MOVIE : imagePlaceHolder.PERSON;
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, style]}>
      {isLoading && (
        <ActivityIndicator style={styles.loading} size="small" color={colors.secondary500} />
      )}

      <Image
        source={uri ? { uri } : imageHolder}
        style={[styles.image, isLoading ? { opacity: 0 } : { opacity: 1 }]}
        onLoadEnd={() => setIsLoading(false)}
        {...rest}
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
