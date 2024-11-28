import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {hs, ms, vs, width} from '@styles/metrics';
import {imagePlaceHolder} from '../../constants';
import {FC} from 'react';
import {ImageBackground, View} from 'react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CollectionCardProps {
  data: {
    id: string;
    label: string;
    movies?: number[] | undefined;
  };
  onPress: (item: {id: string; label: string}) => void;
}

const CollectionCard: FC<CollectionCardProps> = ({data, onPress, ...props}) => {
  const {colors} = useTheme();
  const isAdd = data.id === 'add';

  return (
    <TouchableOpacity
      style={[
        {...styles.button, backgroundColor: colors.primary600},
        isAdd && {...styles.addButton, borderColor: colors.secondary500},
      ]}
      onPress={() => onPress(data)}>
      {isAdd ? (
        <View style={styles.addContent}>
          <Feather
            name="folder-plus"
            size={40}
            color={colors.primary700}
            style={{marginBottom: vs(8)}}
          />
          <AppText variant="light" style={{fontSize: ms(12), color: colors.primary700}}>
            {data.label}
          </AppText>
        </View>
      ) : data.movies && data.movies.length < 4 ? (
        <View style={styles.addContent}>
          <MaterialIcons
            name="video-collection"
            size={40}
            color={colors.primary500}
            style={{marginBottom: vs(8)}}
          />
          <AppText variant="body" style={{color: colors.primary500}}>
            {data.label}
          </AppText>
        </View>
      ) : (
        <ImageBackground
          source={require('../../assets/images/video-folder.png')}
          style={[styles.imageBackground, {backgroundColor: colors.primary600}]}
          imageStyle={styles.imageStyle}>
          <View style={styles.overlay}>
            <AppText
              variant="light"
              style={{color: colors.paleShade, textAlign: 'center'}}>
              {data.label}
            </AppText>
          </View>
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  button: {
    width: width / 2.2 - hs(12),
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(10),
    marginVertical: vs(15),
    overflow: 'hidden',
  },
  addButton: {
    borderStyle: 'dashed',
    borderWidth: ms(2),
    backgroundColor: 'transparent',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: ms(10),
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: ms(5),
  },
  addContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
