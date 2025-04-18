import {useTheme} from '@contexts/ThemeContext';
import {hs, width} from '@styles/metrics';
import {FC} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import {Asset} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppImage from '../atoms/AppImage';
const Icon = AntDesign as any;

interface ImagePickerProps extends TouchableOpacityProps {
  selectedImage?: string | null;
  onImageSelected: (uri: Asset) => void;
  placeholder?: 'movie' | 'person';
  style?: ViewStyle;
}

const ImagePicker: FC<ImagePickerProps> = ({
  style,
  onImageSelected,
  selectedImage,
  placeholder = 'person',
  ...props
}) => {
  const {colors} = useTheme();
  const handlePress = async () => {
    await SheetManager.show('image-picker', {
      payload: {onImageSelected},
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.defaultSize, style]}
      {...props}>
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
