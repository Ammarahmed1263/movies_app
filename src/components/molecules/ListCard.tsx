import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {hs, ms, vs, width} from '@styles/metrics';
import {FC} from 'react';
import {Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MovieGrid from './MovieGrid';
import {ListType} from 'types/userTypes';
import { getImageUrl } from '@utils';

interface UserListProps {
  data: ListType;
  hasTitle?: boolean;
  style?: ViewStyle;
  onPress: (item: ListType) => void;
}

const ListCard: FC<UserListProps> = ({
  data,
  hasTitle = true,
  style,
  onPress,
  ...props
}) => {
  const {colors} = useTheme();
  const isAdd = data.id === 'add';

  return (
    <TouchableOpacity onPress={() => onPress(data)} style={[styles.button, style]} {...props}>
      <View
        style={[
          {...styles.container, backgroundColor: colors.primary600},
          style,
          isAdd && {...styles.addButton, borderColor: colors.secondary500},
        ]}>
        {isAdd ? (
          <View style={styles.addContent}>
            <Feather
              name="folder-plus"
              size={hasTitle ? 60 : 30}
              color={colors.primary700}
            />
          </View>
        ) : data.poster_path && data.poster_path.length > 0 ? (
          <Image source={getImageUrl(data.poster_path)} style={styles.image} resizeMode='cover'/>
        )
        : data.movies && data.movies.length > 0 ? (
          <MovieGrid movies={data.movies} />
        ) : (
          <View style={styles.addContent}>
            <MaterialIcons
              name="video-collection"
              size={hasTitle ? 60 : 35}
              color={colors.primary500}
              style={{marginBottom: vs(8)}}
            />
          </View>
        )}
      </View>
      {hasTitle && (
        <AppText style={[styles.listName, {color: colors.primary700}]}>
          {data.title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

export default ListCard;

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
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  listName: {
    paddingHorizontal: hs(10),
    marginTop: vs(8),
  },
});
