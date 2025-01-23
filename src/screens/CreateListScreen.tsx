import AppButton from '@atoms/AppButton';
import ImagePicker from '@molecules/ImagePicker';
import { useTheme } from '@contexts/ThemeContext';
import LabelInput from '@molecules/LabelInput';
import { useFocusEffect } from '@react-navigation/native';
import { addList } from '@services/listsService';
import { hs, ms, vs } from '@styles/metrics';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CreateListScreenProps } from 'types/listsStackTypes';
import { ListType } from 'types/userTypes';

const CreateListscreen: FC<CreateListScreenProps> = ({navigation}) => {
  const inputRef = useRef<TextInput>(null);
  const [listData, setListData] = useState<ListType>({
    id: Math.ceil(Math.random() * 10000),
    title: '',
    movies: [],
    poster_path: null,
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const {colors} = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({canGoBack}) =>
        canGoBack ? (
          <AppButton onPress={() => navigation.goBack()} flat>
            <Icon name="chevron-back" size={ms(23)} color={colors.paleShade} />
          </AppButton>
        ) : null,
    });
  }, [navigation]);

  const handleSaveButton = (item: ListType) => {
    if (item.title.length === 0) {
      setError("List title can't be empty");
      return;
    }

    addList(item);
    navigation.replace('ListDetailsScreen', {listData: item});
  };

  const handleTitleChange = (value: string) => {
    if (value.length !== 0) {
      setError(undefined);
    }
    setListData({...listData, title: value});
  };

  useFocusEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 800);
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AppButton
          variant="body"
          onPress={() => handleSaveButton(listData)}
          flat>
          Create
        </AppButton>
      ),
    });
  }, [navigation, listData]);

  return (
    <View style={{marginTop: vs(40)}}>
      <ImagePicker
        selectedImage={listData?.poster_path}
        onImageSelected={uri => setListData({...listData, poster_path: uri})}
        placeholder="movie"
      />
      <LabelInput
        ref={inputRef}
        label="List Title"
        value={listData?.title}
        error={error}
        touched={true}
        onChangeText={handleTitleChange}
        containerStyle={{marginHorizontal: hs(20), marginTop: vs(30)}}
      />
    </View>
  );
};

export default CreateListscreen;
