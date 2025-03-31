import PickerOption from '@atoms/PickerOption';
import {useTheme} from '@contexts/ThemeContext';
import {CloudinaryConfig} from '@services/cloudinaryService';
import {vs} from '@styles/metrics';
import {Dispatch, SetStateAction} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {
  Asset,
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

interface ImagePickerProps {
  payload: {
    onImageSelected: (uri: Asset) => void;
    folderPath: string;
    uploadConfig?: Partial<CloudinaryConfig>;
    setUploading: Dispatch<SetStateAction<boolean>>;
  };
  sheetId: string;
}

const ImagePickerSheet = (props: ImagePickerProps) => {
  const {onImageSelected} = props.payload;
  const {colors} = useTheme();

  const handleResponse = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (response.errorCode) {
      Alert.alert('Error', `Image picker error: ${response.errorMessage}`);
      return;
    }

    const image = response.assets?.[0];
    if (!image || !image.uri || !image.type || !image.fileName) {
      Alert.alert('Error', 'Invalid image selected');
      return;
    }

    onImageSelected(image);
    SheetManager.hide('image-picker');
  };

  const openImagePicker = async () => {
    try {
      await launchImageLibrary(options, handleResponse);
    } catch (error) {
      console.error('Error launching image picker: ', error);
    }
  };

  const handleCameraLaunch = async () => {
    try {
      await launchCamera(options, handleResponse);
    } catch (error) {
      console.error('Error launching camera: ', error);
    }
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
