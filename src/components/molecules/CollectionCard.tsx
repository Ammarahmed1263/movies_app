import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {hs, ms, vs, width} from '@styles/metrics';
import {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface CollectionCardProps {
  data: {
    id: string;
    label: string;
  };
  onPress: (item: {id: string; label: string}) => void;
}

const CollectionCard: FC<CollectionCardProps> = ({data, onPress, ...props}) => {
  const {colors} = useTheme();
  const isAdd = data.id === 'add';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: colors.secondary500},
        isAdd && {...styles.addButton, borderColor: colors.secondary500},
      ]}
      onPress={() => onPress(data)}>
      {isAdd && <Icon name="folder-plus" size={40} color={colors.paleShade} style={{marginBottom: vs(8)}} />}
      <AppText variant={isAdd ? "light" : 'subheading'} style={{fontSize: isAdd ? ms(12) : ms(18)}}>
        {data.label}
      </AppText>
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
  },
  addButton: {
    borderStyle: 'dashed',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
});
