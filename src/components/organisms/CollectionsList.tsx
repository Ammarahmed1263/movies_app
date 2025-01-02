import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import { useTheme } from '@contexts/ThemeContext';
import CollectionCard from '@molecules/CollectionCard';
import { useNavigation } from '@react-navigation/native';
import { hs, vs } from '@styles/metrics';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CollectionStackNavigationProp } from 'types/mainStackTypes';

interface CollectionsListProps {
  title: string;
  seeAll?: boolean;
}

const CollectionsList: FC<CollectionsListProps> = ({title, seeAll = false}) => {
  const data = [
    {id: 'add', label: 'Create a collection'},
    {id: '3', label: 'watch later', movies: ['/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg']},
    {id: '5', label: 'romantic movies', movies: []},
    {id: '1', label: 'action', movies: ['/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', '', '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg']},
    {id: '2', label: 'drama and sci-fi', movies: ['', '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg']},
    {id: '4', label: 'marvel and DC', movies: ['/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', 'aosm8NMQ3UyoBVpSxyimorCQykC.jpg']},
    // {id: '6', label: 'collection 6', movies: [1,2,3,4,5]},
  ];
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<CollectionStackNavigationProp>();

  useEffect(() => {
    (async () => {
      
    })()
  }, [])

  const handleItemPress = (item: {id: string; label: string}) => {
    if (item.id === 'add') {
      navigation.navigate('CollectionStack', {screen: 'CreateCollection'});
    } else {
      navigation.navigate('CollectionStack', {screen: 'CollectionDetails'});
    }
  };

  const handleSeeAllPress = () => {
    navigation.navigate('CollectionStack', {screen: 'ListCollections'});
  }
 
  const handleRender = ({
    item,
    index,
  }: {
    item: {id: string; label: string; movies?: string[] | undefined};
    index: number;
  }) => {
    return <CollectionCard key={index} data={item} onPress={handleItemPress} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Icon
            name="movie"
            size={30}
            style={styles.icon}
            color={colors.paleShade}
          />
          <AppText variant="heading">{title}</AppText>
        </View>
        {seeAll && (
          <AppButton
            variant="body"
            textStyle={{
              ...styles.button,
              color: colors.secondary500,
            }}
            onPress={handleSeeAllPress}
            flat>
            {t('see_all')}
          </AppButton>
        )}
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={handleRender}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CollectionsList;

const styles = StyleSheet.create({
  container: {
    marginTop: vs(10),
    marginBottom: vs(30)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(12),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingEnd: hs(10)
  },
  button: {
    textTransform: 'none',
  },
  listContainer: {
    paddingHorizontal: hs(12),
    gap: hs(8),
  },
});
