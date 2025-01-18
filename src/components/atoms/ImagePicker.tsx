import {hs, width} from '@styles/metrics';
import {FC, useState} from 'react';
import {ImageSourcePropType, TouchableOpacity, ViewStyle} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import AppModal from './AppModal';
import AppButton from './AppButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppImage from './AppImage';

const options: CameraOptions = {
  mediaType: 'photo',
  includeBase64: true,
  maxHeight: 2000,
  maxWidth: 2000,
};

interface ImagePickerProps {
  selectedImage?: string | null;
  onImageSelected: (uri: string | undefined) => void;
  placeholder?: 'movie' | 'person';
  style?: ViewStyle;
}

const ImagePicker: FC<ImagePickerProps> = ({
  style,
  onImageSelected,
  selectedImage,
  placeholder = 'person',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleResponse = (response: ImagePickerResponse) => {
    console.log('response:', response)
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image picker error: ', response.errorCode);
    } else {
      let imageUri = response.assets?.[0]?.uri;
      onImageSelected(imageUri);
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
    <>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={[styles.defaultSize, style]}
        >
        <View style={[styles.defaultSize, {overflow: 'hidden'}, style]}>
          <AppImage
            source={selectedImage ? {uri: selectedImage} : undefined}
            placeholder={placeholder}
          />
        </View>
        <View
          style={styles.icon}>
          <Icon name="edit" size={20} color="white" />
        </View>
      </TouchableOpacity>

      <AppModal visible={isVisible} handleClose={() => setIsVisible(false)}>
        <AppButton onPress={handleCameraLaunch}>
          <Icon name="camera" size={30} color="white" />
        </AppButton>
        <AppButton onPress={openImagePicker}>
          <Icon name="folder" size={30} color="white" />
        </AppButton>
      </AppModal>
    </>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  defaultSize: {
    borderRadius: width / 6,
    width: width / 3,
    height: width / 3,
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    end: 0,
    bottom: 0,
    backgroundColor: 'chocolate',
    padding: hs(8),
    borderRadius: hs(20),
    justifyContent: 'center',
    alignItems: 'center',
  }
});
