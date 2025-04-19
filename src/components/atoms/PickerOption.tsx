import {FC} from 'react';
import AppButton from './AppButton';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/AntDesign';
const AntDesign = Icon as any;
import {useTheme} from '@contexts/ThemeContext';
import {StyleSheet, ViewStyle} from 'react-native';

interface PickerOptionProps {
  label: string;
  iconName: string;
  iconSize: number;
  viewStyle?: ViewStyle;
  onPress: () => void;
}

const PickerOption: FC<PickerOptionProps> = ({
  label,
  viewStyle,
  iconName,
  iconSize,
  onPress,
  ...props
}) => {
  const {colors} = useTheme();

  return (
    <AppButton
      onPress={onPress}
      customViewStyle={[styles.default, viewStyle ?? {}]}
      flat
      customView
      {...props}>
      <AntDesign name={iconName} size={iconSize} color={colors.secondary500} />
      <AppText style={{color: colors.primary700}} variant="body">
        {label}
      </AppText>
    </AppButton>
  );
};

export default PickerOption;

const styles = StyleSheet.create({
  default: {
    alignItems: 'center',
  },
});
