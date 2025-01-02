import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {hs, ms, vs, width} from '@styles/metrics';
import {imagePlaceHolder} from '../../constants';
import {FC} from 'react';
import {
  Image,
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MovieGrid from './MovieGrid';

interface CollectionCardProps {
  data: {
    id: string;
    label: string;
    movies?: string[] | undefined;
  };
  onPress: (item: {id: string; label: string}) => void;
}

const CollectionCard: FC<CollectionCardProps> = ({data, onPress, ...props}) => {
  const {colors} = useTheme();
  const isAdd = data.id === 'add';

  return (
    <TouchableOpacity onPress={() => onPress(data)} style={styles.button}>
      <View
        style={[
          {...styles.container, backgroundColor: colors.primary600},
          isAdd && {...styles.addButton, borderColor: colors.secondary500},
        ]}>
        {isAdd ? (
          <View style={styles.addContent}>
            <Feather
              name="folder-plus"
              size={60}
              color={colors.primary700}
              style={{marginBottom: vs(8)}}
            />
          </View>
        ) : data.movies && data.movies.length > 0 ? (
          <MovieGrid movies={data.movies} />
        ) : (
          <View style={styles.addContent}>
            <MaterialIcons
              name="video-collection"
              size={60}
              color={colors.primary500}
              style={{marginBottom: vs(8)}}
            />
          </View>
        )}
      </View>
      <AppText style={[styles.collectionName, {color: colors.primary700}]}>
        {data.label}
      </AppText>
    </TouchableOpacity>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  button: {
    width: width / 2.1 - hs(16),
  },
  container: {
    width: '100%',
    aspectRatio: 1 / 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(15),
    marginTop: vs(5),
    overflow: 'hidden',
  },
  addButton: {
    borderStyle: 'dashed',
    borderWidth: ms(2),
    backgroundColor: 'transparent',
  },
  addContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectionName: {
    paddingHorizontal: hs(10),
    marginTop: vs(8),
  },
});
