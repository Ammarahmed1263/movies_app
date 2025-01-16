import useUserLists from '@hooks/useUserlists';
import LabelInput from '@molecules/LabelInput';
import {FC, useLayoutEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {UserListNavigationProp} from 'types/userListsStackTypes';

const CreateUserListScreen: FC<{navigation: UserListNavigationProp}> = ({
  navigation,
}) => {
  const {lists} = useUserLists();

  const handleSaveButton = () => {
    console.log('item has been saved successfully');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Save" onPress={handleSaveButton} />,
    });
  }, [navigation]);

  return (
    <View>
      <Text>CreateUserListScreen</Text>
      <LabelInput label="List Title"/>
    </View>
  );
};

export default CreateUserListScreen;
