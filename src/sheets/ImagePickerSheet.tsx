import PickerOption from '@atoms/PickerOption';
import {useTheme} from '@contexts/ThemeContext';
import {vs} from '@styles/metrics';
import {StyleSheet, View} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const options: CameraOptions = {
  mediaType: 'photo',
  includeBase64: true,
  maxHeight: 2000,
  maxWidth: 2000,
};

const ImagePickerSheet = (props: {
  payload: {
    onImageSelected: (uri: string | undefined) => void;
  };
  sheetId: string;
}) => {
  console.log('sheet props: ', props);
  const {onImageSelected} = props.payload;
  const {colors} = useTheme();

  const handleResponse = (response: ImagePickerResponse) => {
    console.log('response:', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image picker error: ', response.errorCode);
    } else {
      let imageUri = response.assets?.[0]?.uri;
      onImageSelected(imageUri);
      SheetManager.hide('image-picker');
    }
  };

  const openImagePicker = () => {
    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    console.log('camera launch');
    launchCamera(options, handleResponse);
  };

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{backgroundColor: colors.primary500}}
      indicatorStyle={{backgroundColor: colors.primary700}}>
      <View style={styles.sheetContent}>
        <PickerOption
          label="Camera"
          iconName="camerao"
          iconSize={70}
          onPress={handleCameraLaunch}
        />

        <PickerOption
          label="Gallery"
          iconName="folder1"
          iconSize={60}
          onPress={openImagePicker}
        />
      </View>
    </ActionSheet>
  );
};

export default ImagePickerSheet;

const styles = StyleSheet.create({
  sheetContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: vs(10),
  },
});
