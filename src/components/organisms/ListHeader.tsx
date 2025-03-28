import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import useOrientation from '@hooks/useOrientation';
import ListCard from '@molecules/ListCard';
import {HEADER_HEIGHT, hs, vs} from '@styles/metrics';
import {capitalizeInput} from '@utils';
import {FC} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ListType} from 'types/userTypes';
const Icon = Ionicons as any;

interface ListHeaderProps {
  list: ListType;
  headerStyle: StyleProp<ViewStyle>;
  opacityStyle: StyleProp<ViewStyle>;
}

const ListHeader: FC<ListHeaderProps> = ({list, headerStyle, opacityStyle}) => {
  const {isPortrait, height} = useOrientation();
  const {colors} = useTheme();

  const handleAddPress = () => {
    SheetManager.show('add-to-list', {
      payload: {movies: list?.movies, id: list.id},
    });
  };

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: isPortrait ? HEADER_HEIGHT : undefined,
          flexGrow: 1,
          position: isPortrait ? 'absolute' : 'relative',
        },
        headerStyle,
      ]}>
      <Animated.View
        style={[
          styles.imageContainer,
          isPortrait && {height: HEADER_HEIGHT * 0.8},
          opacityStyle,
        ]}>
        <ListCard
          data={list}
          style={{
            ...styles.image,
            backgroundColor: colors.primary600,
            height: isPortrait ? HEADER_HEIGHT * 0.8 : height / 1.6,
          }}
          hasTitle={false}
          disabled
        />
      </Animated.View>
      <Animated.View style={[styles.titleSection]}>
        <AppText variant="heading">{capitalizeInput(list.title)}</AppText>
        <TouchableOpacity onPress={handleAddPress}>
          <Icon name="add" size={30} color={colors.paleShade} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 1000,
  },
  imageContainer: {
    marginVertical: vs(5),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: hs(20),
    ...Platform.select({
      ios: {
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(15),
    height: HEADER_HEIGHT * 0.15,
  },
});
