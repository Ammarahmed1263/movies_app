import useLists from '@hooks/useLists';
import LabelInput from '@molecules/LabelInput';
import {FC, useLayoutEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {UserListNavigationProp} from 'types/listsStackTypes';

const CreateListscreen: FC<{navigation: UserListNavigationProp}> = ({
  navigation,
}) => {
  const {lists} = useLists();

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
      <Text>CreateListscreen</Text>
      <LabelInput label="List Title"/>
    </View>
  );
};

export default CreateListscreen;
