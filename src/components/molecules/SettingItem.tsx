import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface SettingsItemProps {
  icon: string;
  label: string;
  value?: string;
  type?: 'toggle' | 'select' | 'button';
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
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.settingsItem, {borderBottomColor: colors.paleShade}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.settingsItemLeft}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={20} color={colors.primary700} />
        </View>
        <AppText style={styles.settingsItemLabel}>{label}</AppText>
      </View>
      <View style={styles.settingsItemRight}>
        {type === 'toggle' ? (
          <Switch
            value={isToggled}
            onValueChange={onPress}
            trackColor={{false: colors.primary700, true: colors.secondary500}}
            thumbColor={isToggled ? colors.primary700 : colors.secondary500}
            style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
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
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  settingsItemLabel: {
    fontSize: 16,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemValue: {
    marginRight: 8,
    color: '#666',
  },
});
