import AppButton from '@atoms/AppButton';
import { useTheme } from '@contexts/ThemeContext';
import { ms } from '@styles/metrics';
import {FC, useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, Alert, Text, View} from 'react-native';
import {ListDetailsScreenProps} from 'types/listsStackTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListType } from 'types/userTypes';
import { use } from 'i18next';
import useLists from '@hooks/useLists';
import { removeList } from '@services/listsService';

const ListDetailsScreenScreen: FC<ListDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { listData } = route.params;
  const { colors } = useTheme();

  const handleRemoveList = () => {
    Alert.alert('Confirmation', 'Are you sure you want to delete the whole list?', [
      {
        text: 'Cancel',
        style: 'cancel',
        isPreferred: true
      },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: () => {
          removeList(Number(listData?.id));
          navigation.pop();
        },
      }
    ])
  };
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: listData?.title,
      headerRight: () => (
        <AppButton variant="body" onPress={handleRemoveList} flat>
          delete
        </AppButton>
      ),
      headerLeft: ({canGoBack}) =>
        canGoBack ? (
          <AppButton onPress={() => navigation.goBack()} flat>
            <Icon
              name="chevron-back"
              size={ms(23)}
              color={colors.paleShade}
            />
          </AppButton>
        ) : null,
    });
  }, [navigation, listData]);

  if (!listData) {
    return <ActivityIndicator size="large" color={colors.paleShade} />;
  }

  return (
    <View>
      <Text>{listData?.title}</Text>
    </View>
  );
};

export default ListDetailsScreenScreen;
