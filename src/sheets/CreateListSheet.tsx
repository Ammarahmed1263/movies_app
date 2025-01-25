import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import ImagePicker from '@molecules/ImagePicker';
import LabelInput from '@molecules/LabelInput';
import {useFocusEffect} from '@react-navigation/native';
import {addList} from '@services/listsService';
import {height, hs, vs} from '@styles/metrics';
import {FC, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import ActionSheet, {
  ActionSheetProps,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {ListType} from 'types/userTypes';

const CreateListSheet = (props: {
  payload: {
    onListCreated: (listId: number) => void;
  };
  sheetId: string;
}) => {
  const inputRef = useRef<TextInput>(null);
  const {onListCreated} = props.payload;
  const [listData, setListData] = useState<ListType>({
    id: Math.ceil(Math.random() * 10000) as number,
    title: '',
    movies: [],
    poster_path: null,
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const {colors} = useTheme();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: ({canGoBack}) =>
  //       canGoBack ? (
  //         <AppButton onPress={() => navigation.goBack()} flat>
  //           <Icon name="chevron-back" size={ms(23)} color={colors.paleShade} />
  //         </AppButton>
  //       ) : null,
  //     headerRight: () => (
  //       <AppButton
  //         variant="body"
  //         onPress={() => handleSaveButton(listData)}
  //         flat>
  //         Create
  //       </AppButton>
  //     ),
  //   });
  // }, [navigation]);

  const handleSaveButton = async (item: ListType) => {
    if (item.title.length === 0) {
      setError("List title can't be empty");
      return;
    }

    addList(item);
    await SheetManager.hide(props.sheetId);

    onListCreated(Number(item.id));
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

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{backgroundColor: colors.primary500}}
      indicatorStyle={{backgroundColor: colors.primary700}}
      snapPoints={[70, 100]}
      initialSnapIndex={0}
      gestureEnabled>
      <View style={styles.header}>
        <View style={styles.spacer} />
        <AppText variant="heading" style={styles.headerText}>
          Create List
        </AppText>
        <AppButton
          variant="body"
          style={styles.create}
          hitSlop={20}
          onPress={() => handleSaveButton(listData)}
          flat>
          Create
        </AppButton>
      </View>
      <View style={styles.container}>
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
    paddingHorizontal: hs(10),
  },
  spacer: {
    flex: 1,
  },
  headerText: {
    flex: 4,
    textAlign: 'center',
  },
  create: {
    flex: 1,
  },
  container: {
    minHeight: height * 0.6,
    paddingTop: vs(20),
    marginBottom: vs(40),
    paddingHorizontal: hs(20),
  },
});
