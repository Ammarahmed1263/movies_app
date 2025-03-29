import PickerOption from '@atoms/PickerOption';
import {useTheme} from '@contexts/ThemeContext';
import {
  CloudinaryConfig,
  uploadToCloudinary,
} from '@services/cloudinaryService';
import {vs} from '@styles/metrics';
import axios, {AxiosError} from 'axios';
import {Dispatch, SetStateAction} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
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

const defaultUploadConfig = {
  cloudName: 'moviecorn-co',
  uploadPreset: 'app_img',
};

interface ImagePickerProps {
  payload: {
    onImageSelected: (uri: string | undefined) => void;
    folderPath: string;
    uploadConfig?: Partial<CloudinaryConfig>;
    setUploading: Dispatch<SetStateAction<boolean>>;
  };
  sheetId: string;
}

const ImagePickerSheet = (props: ImagePickerProps) => {
  const {
    onImageSelected,
    folderPath,
    uploadConfig: customConfig,
    setUploading,
  } = props.payload;
  const {colors} = useTheme();

  const uploadConfig = {...defaultUploadConfig, ...customConfig};

  const handleResponse = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (response.errorCode) {
      Alert.alert('Error', `Image picker error: ${response.errorMessage}`);
      return;
    }

    setUploading(true);
    const image = response.assets?.[0];
    if (!image?.uri || !image.type || !image.fileName) {
      Alert.alert('Error', 'Invalid image selected');
      return;
    }

    SheetManager.hide('image-picker');
    try {
      const secureUrl = await uploadToCloudinary(
        {
          uri: image.uri,
          type: image.type,
          fileName: image.fileName,
        },
        folderPath,
        uploadConfig,
      );
      onImageSelected(secureUrl);
    } catch (error) {
      Alert.alert('Upload Failed', (error as Error).message);
      onImageSelected(undefined);
    } finally {
      setUploading(false);
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
