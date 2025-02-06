import PickerOption from '@atoms/PickerOption';
import {useTheme} from '@contexts/ThemeContext';
import {vs} from '@styles/metrics';
import axios, {AxiosError} from 'axios';
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

  const uploadToCloudinary = async (file: any) => {
    console.log('file here: ', file);
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
    formData.append('upload_preset', 'app_img');
    formData.append('cloud_name', 'moviecorn-co');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/moviecorn-co/upload`,
        formData,
        {
          headers: {
            // Axios will automatically set the Content-Type with boundary
            // for FormData, so you can omit this or keep it as:
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const data = response.data;
      console.log('cloudinary response: ', data);
      onImageSelected(data.secure_url);
      console.log('Upload successful:', data);
    } catch (error: any) {
      console.error('Upload error:', error.message);
    }
  };

  const handleResponse = (response: ImagePickerResponse) => {
    console.log('response:', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image picker error: ', response.errorCode);
    } else {
      let imageUri = response.assets?.[0];
      // onImageSelected(imageUri);
      uploadToCloudinary(imageUri);
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
