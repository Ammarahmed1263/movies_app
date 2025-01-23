import {useTheme} from '@contexts/ThemeContext';
import {hs, vs, width} from '@styles/metrics';
import {FC, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import AppButton from '../atoms/AppButton';
import AppImage from '../atoms/AppImage';
import AppText from '../atoms/AppText';
import PickerOption from '@atoms/PickerOption';

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
  const actionSheetRef = useRef<ActionSheetRef>(null);
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
      actionSheetRef.current?.hide();
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
        onPress={() => actionSheetRef.current?.show()}
        style={[styles.defaultSize, style]}>
        <View style={[styles.defaultSize, {overflow: 'hidden'}, style]}>
          <AppImage
            source={selectedImage ? {uri: selectedImage} : undefined}
            placeholder={placeholder}
          />
        </View>
        <View style={[styles.icon, {backgroundColor: colors.secondary500}]}>
          <Icon name="edit" size={22} color="white" />
        </View>
      </TouchableOpacity>

      <ActionSheet
        ref={actionSheetRef}
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
    end: 2,
    bottom: 2,
    padding: hs(6),
    borderRadius: hs(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 2},
  },
  sheetContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: vs(40),
    paddingTop: vs(10),
  },
  optionContainer: {
    alignItems: 'center',
  },
});
