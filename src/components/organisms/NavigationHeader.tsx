import { I18nManager, StyleSheet, View, ViewStyle } from "react-native";
import AppButton from "@atoms/AppButton";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "@contexts/ThemeContext";
import { hs, ms } from "@styles/metrics";
import { FC } from "react";

interface NavigationHeaderProps {
  onGoBack: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  style?: ViewStyle;
}

const NavigationHeader: FC<NavigationHeaderProps> = ({onGoBack, onToggleFavorite, isFavorite, style}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.imageButtons, style]}>
      <AppButton
        onPress={onGoBack}
        style={{
          ...styles.topButton,
          backgroundColor: colors.secondaryShadow,
        }}
        customViewStyle={{
          transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}],
        }}
        customView>
        <Icon name="chevron-back" size={ms(25)} color={colors.paleShade} />
      </AppButton>
      {onToggleFavorite && <AppButton
        style={{
          ...styles.topButton,
          backgroundColor: colors.secondaryShadow,
        }}
        onPress={onToggleFavorite}
        customView>
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={ms(25)}
          color={colors.paleShade}
        />
      </AppButton>}
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  topButton: {
    width: hs(50),
    aspectRatio: 1 / 1,
    borderRadius: hs(50) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hs(8),
  },
})
