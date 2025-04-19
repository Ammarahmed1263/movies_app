import AppImage from '@atoms/AppImage';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import useOrientation from '@hooks/useOrientation';
import {hs, ms, vs} from '@styles/metrics';
import {FC} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {ListType} from 'types/userTypes';
import MovieGrid from './MovieGrid';
const Feather = Icon as any;
const MaterialIcons = Icon1 as any;

interface UserListProps {
  data: ListType;
  hasTitle?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: (item: ListType) => void;
}

const ListCard: FC<UserListProps> = ({
  data,
  hasTitle = true,
  disabled = false,
  style,
  onPress,
  ...props
}) => {
  const {colors} = useTheme();
  const isAdd = data.id === 'add';
  const {orientation, width} = useOrientation();

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(data)}
      style={[
        styles.button,
        !disabled && {
          width:
            orientation === 'portrait' ? width / 2.5 : width / 4 - hs(8 * 5),
        },
        style,
      ]}
      disabled={disabled}
      {...props}>
      <Animated.View
        style={[
          {...styles.container, backgroundColor: colors.primary600},
          style,
          isAdd && {...styles.addButton, borderColor: colors.secondary500},
        ]}>
        {isAdd ? (
          <View style={styles.addContent}>
            <Feather name="folder-plus" size={50} color={colors.primary700} />
          </View>
        ) : data.poster_path ? (
          <AppImage
            source={data.poster_path as string}
            placeholder="movie"
            viewStyle={styles.image}
            loadingSize={hs(35)}
          />
        ) : data.movies && data.movies.length > 0 ? (
          <MovieGrid movies={data.movies} />
        ) : (
          <View style={styles.addContent}>
            <MaterialIcons
              name="video-collection"
              size={50}
              color={colors.primary500}
              style={{marginBottom: vs(8)}}
            />
          </View>
        )}
      </Animated.View>
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
  button: {},
  container: {
    width: '100%',
    aspectRatio: 1 / 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(15),
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
