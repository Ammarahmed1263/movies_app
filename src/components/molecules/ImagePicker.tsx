import {useTheme} from '@contexts/ThemeContext';
import {hs, width} from '@styles/metrics';
import {Dispatch, FC, SetStateAction, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import AppImage from '../atoms/AppImage';
import {CloudinaryConfig} from '@services/cloudinaryService';
import AppLoading from '@atoms/AppLoading';

interface ImagePickerProps {
  selectedImage?: string | null;
  onImageSelected: (uri: string | undefined) => void;
  folderPath: string;
  uploading: boolean;
  setUploading: Dispatch<SetStateAction<boolean>>;
  uploadConfig?: CloudinaryConfig;
  placeholder?: 'movie' | 'person';
  style?: ViewStyle;
}

const ImagePicker: FC<ImagePickerProps> = ({
  style,
  onImageSelected,
  selectedImage,
  folderPath,
  uploadConfig,
  placeholder = 'person',
  uploading,
  setUploading,
}) => {
  const {colors} = useTheme();

  const handlePress = async () => {
    await SheetManager.show('image-picker', {
      payload: {onImageSelected, folderPath, uploadConfig, setUploading},
    });
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        disabled={uploading}
        style={[
          styles.defaultSize,
          uploading && {borderWidth: 1, borderColor: colors.secondary500},
          style,
        ]}>
        <View style={[styles.defaultSize, {overflow: 'hidden'}, style]}>
          {uploading ? (
            <AppLoading
              size={hs(30)}
              speed={2}
              source={require('../../assets/lottie/loading_fade.json')}
            />
          ) : (
            <AppImage
              source={selectedImage ? {uri: selectedImage} : undefined}
              placeholder={placeholder}
            />
          )}
        </View>
        <View style={[styles.icon, {backgroundColor: colors.secondary500}]}>
          <Icon name="edit" size={22} color="white" />
        </View>
      </TouchableOpacity>
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
});
