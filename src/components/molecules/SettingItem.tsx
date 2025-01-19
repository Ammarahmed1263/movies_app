import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // Switch,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Switch, SwitchProps } from 'react-native-switch';
import { hs, ms, vs } from '@styles/metrics';

interface SettingsItemProps {
  icon: string;
  label: string;
  value?: string;
  type?: 'toggle' | 'select' | 'button';
  switchProps?: SwitchProps
  isToggled?: boolean;
  onPress: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  label,
  value,
  type = 'button',
  isToggled,
  onPress,
  switchProps
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.settingsItem, {borderBottomColor: colors.paleShade}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.settingsItemLeft}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={20} color={colors.primary700} />
        </View>
        <AppText>{label}</AppText>
      </View>
      <View style={styles.settingsItemRight}>
        {type === 'toggle' ? (
          <Switch
            value={isToggled}
            activeText=''
            inActiveText=''
            onValueChange= {onPress}
            circleBorderWidth={0}
            circleSize={20}
            switchWidthMultiplier={2.5}
            barHeight={28}
            switchLeftPx={2.8}
            switchRightPx={2.8}
            {...switchProps}
          />
        ) : (
          <>
            {value && (
              <AppText
                style={[styles.settingsItemValue, {color: colors.primary600}]}>
                {value}
              </AppText>
            )}
            {type === 'select' && (
              <Icon
                name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                size={20}
                color={colors.primary700}
              />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vs(12),
    paddingHorizontal: hs(15),
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: hs(32),
    height: vs(32),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: hs(8),
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemValue: {
    marginRight: hs(8),
  },
});
