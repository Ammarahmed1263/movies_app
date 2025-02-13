import {I18nManager, StyleSheet, View, ViewStyle} from 'react-native';
import AppButton from '@atoms/AppButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@contexts/ThemeContext';
import {hs, ms} from '@styles/metrics';
import {FC} from 'react';

interface NavigationHeaderProps {
  onGoBack: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  style?: ViewStyle;
}

const NavigationHeader: FC<NavigationHeaderProps> = ({
  onGoBack,
  onToggleFavorite,
  isFavorite,
  style,
}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.imageButtons, style]}>
      <AppButton
        onPress={onGoBack}
        style={{
          ...styles.topButton,
          backgroundColor: colors.secondaryShadow,
        }}
        pressableStyle={{
          padding: 0,
          width: '100%',
          height: '100%',
        }}
        customViewStyle={{
          transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}],
        }}
        customView>
        <Icon name="chevron-back" size={ms(30)} color={colors.paleShade} />
      </AppButton>
      {onToggleFavorite && (
        <AppButton
          style={{
            ...styles.topButton,
            backgroundColor: colors.secondaryShadow,
          }}
          pressableStyle={{
            padding: 0,
            width: '100%',
            height: '100%',
          }}
          onPress={onToggleFavorite}
          customView>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={ms(28)}
            color={colors.paleShade}
            style={{includeFontPadding: false}}
          />
        </AppButton>
      )}
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  imageButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hs(8),
  },
  topButton: {
    width: hs(45),
    aspectRatio: 1 / 1,
    borderRadius: hs(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
