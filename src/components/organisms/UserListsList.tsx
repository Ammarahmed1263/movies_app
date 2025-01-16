import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import useUserLists from '@hooks/useUserlists';
import UserListCard from '@molecules/UserListCard';
import {useNavigation} from '@react-navigation/native';
import {hs, vs} from '@styles/metrics';
import {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserListStackNavigationProp} from 'types/mainStackTypes';
import {UserListType} from 'types/userTypes';

interface UserListsListProps {
  title: string;
  seeAll?: boolean;
}

const UserListsList: FC<UserListsListProps> = ({title, seeAll = false}) => {
  const {lists} = useUserLists();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<UserListStackNavigationProp>();

  const handleItemPress = (item: UserListType) => {
    if (item.id === 'add') {
      navigation.navigate('UserListStack', {screen: 'CreateUserList'});
    } else {
      navigation.navigate('UserListStack', {screen: 'UserListDetails', params: {listTitle: item.title}});
    }
  };

  const handleSeeAllPress = () => {
    navigation.navigate('UserListStack', {screen: 'ListUserLists'});
  };

  const handleRender = ({item, index}: {item: UserListType; index: number}) => {
    return <UserListCard key={index} data={item} onPress={handleItemPress} />;
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
        data={lists.slice(0, 6)}
        keyExtractor={item => item.id.toString()}
        renderItem={handleRender}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserListsList;

const styles = StyleSheet.create({
  container: {
    marginTop: vs(10),
    marginBottom: vs(30),
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
    paddingEnd: hs(10),
  },
  button: {
    textTransform: 'none',
  },
  listContainer: {
    paddingHorizontal: hs(12),
    gap: hs(8),
  },
});
