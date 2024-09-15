import { useTheme } from '@contexts/ThemeContext';
import React, { useState } from 'react';
import { Image, StyleSheet, View, ActivityIndicator, ImageProps, ImageStyle } from 'react-native';
import person_placeholder from '../../../assets/images/person_placeholder.png' 
import movie_placeholder from '../../../assets/images/movie_placeholder.png' 

enum imagePlaceHolder {
  PERSON= person_placeholder,
  MOVIE= movie_placeholder,
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
