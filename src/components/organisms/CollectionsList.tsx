import AppText from '@atoms/AppText';
import { useTheme } from '@contexts/ThemeContext';
import CollectionCard from '@molecules/CollectionCard';
import {hs, vs, width} from '@styles/metrics';
import {FC} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

interface CollectionsListProps {
  title: string;
}

const CollectionsList: FC<CollectionsListProps> = ({title}) => {
  const data = [
    {id: 'add', label: 'Add New Collection'},
    {id: '1', label: 'collection 1'},
    {id: '2', label: 'collection 2'},
    {id: '3', label: 'collection 3'},
    {id: '4', label: 'collection 4'},
    {id: '5', label: 'collection 5'},
    {id: '6', label: 'collection 6'},
  ];
  const { colors } = useTheme();

  const handleItemPress = (item: {id: string; label: string}) => {
    if (item.id === 'add') {
      Alert.alert('Add Button Pressed', 'You clicked the Add button!');
    } else {
      Alert.alert('Item Pressed', `You clicked on ${item.label}`);
    }
  };

  const handleRender = ({
    item,
    index,
  }: {
    item: {id: string; label: string};
    index: number;
  }) => {
    return <CollectionCard data={item} onPress={handleItemPress} />;
  };

  return (
    <View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingHorizontal: 5}}>
          <Icon name='movie' size={25} style={{padding: 5}} color={colors.paleShade}/>
          <AppText variant='bold'>{title}</AppText>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={handleRender}
        horizontal
        contentContainerStyle={{paddingHorizontal: hs(12), gap: hs(8)}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CollectionsList;
