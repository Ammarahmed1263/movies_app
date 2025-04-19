import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import ImagePicker from '@molecules/ImagePicker';
import LabelInput from '@molecules/LabelInput';
import {useFocusEffect} from '@react-navigation/native';
import {addList} from '@services/listsService';
import {height, hs, vs, width} from '@styles/metrics';
import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {ListType} from 'types/userTypes';
import auth from '@react-native-firebase/auth';
import {uploadToCloudinary} from '@services/cloudinaryService';
import {Asset} from 'react-native-image-picker';
import AppLoading from '@atoms/AppLoading';

const CreateListSheet = (props: {
  payload: {
    onListCreated: (listId: number) => void;
  };
  sheetId: string;
}) => {
  const inputRef = useRef<TextInput>(null);
  const {onListCreated} = props.payload;
  const {t} = useTranslation();
  const [listData, setListData] = useState<ListType>({
    id: Math.ceil(Math.random() * 10000) as number,
    title: '',
    movies: [],
    poster_path: null,
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const {colors} = useTheme();

  const handleSaveButton = async () => {
    if (listData.title.length === 0) {
      setError("List title can't be empty");
      return;
    }

    setIsUploading(true);
    try {
      const secureUrl = await uploadToCloudinary(
        {
          uri: (listData.poster_path as Asset)?.uri!,
          type: (listData.poster_path as Asset)?.type!,
          fileName: `list-${listData.id}`,
        },
        `users/${auth().currentUser?.uid}/lists`,
      );

      const updatedListData = {
        ...listData,
        poster_path: secureUrl,
      };

      await addList(updatedListData);
      onListCreated(Number(updatedListData.id));
      await SheetManager.hide(props.sheetId);
    } catch (err) {
      console.error('error saving picture: ', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleTitleChange = (value: string) => {
    if (value.length !== 0) {
      setError(undefined);
    }
    setListData({...listData, title: value});
  };

  const handleImageSelection = async (image: Asset) => {
    setListData(prev => ({...prev, poster_path: image}));
  };

  useFocusEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 800);
  });

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{backgroundColor: colors.primary500}}
      indicatorStyle={{backgroundColor: colors.primary700}}
      snapPoints={[70, 100]}
      initialSnapIndex={0}
      closeOnTouchBackdrop={!isUploading}
      gestureEnabled>
      <View style={styles.header}>
        <AppText variant="heading">{t('create_new_list')}</AppText>
        <AppButton
          variant="body"
          textStyle={isUploading ? {color: colors.primary700} : undefined}
          hitSlop={20}
          onPress={handleSaveButton}
          disabled={isUploading}
          flat>
          {isUploading ? t('uploading') : t('create')}
        </AppButton>
      </View>
      <View style={styles.container}>
        <ImagePicker
          selectedImage={
            typeof listData?.poster_path === 'string'
              ? listData?.poster_path
              : listData?.poster_path?.uri
          }
          onImageSelected={handleImageSelection}
          placeholder="movie"
          disabled={isUploading}
        />
        <LabelInput
          ref={inputRef}
          label={t('list_name')}
          value={listData?.title}
          error={error}
          touched={true}
          onChangeText={handleTitleChange}
          readOnly={isUploading}
        />
      </View>
    </ActionSheet>
  );
};

export default CreateListSheet;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: hs(15),
  },
  container: {
    minHeight: height * 0.6,
    paddingTop: vs(20),
    marginBottom: vs(40),
    paddingHorizontal: hs(20),
  },
});
