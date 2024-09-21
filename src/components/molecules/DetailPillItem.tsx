import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '@atoms/AppText';
import { useTheme } from '@contexts/ThemeContext';

interface DetailPillProps {
  label: string;
  value: string | number;
  border?: boolean;
}

const DetailPillItem: FC<DetailPillProps> = ({ label, value, border = true }) => {
  const { colors } = useTheme();
  
  return (
    <View
      style={[
        styles.shortItem,
        { borderColor: colors.primary500 },
        !border && { borderRightWidth: 0, paddingRight: 0 }
      ]}
    >
      <AppText variant='body' style={{ color: colors.primary500 }} numberOfLines={1}>
        {label}
      </AppText>
      <AppText variant='caption' style={{ color: colors.primary500 }} numberOfLines={1}>
        {value}
      </AppText>
    </View>
  );
};

export default DetailPillItem;


const styles = StyleSheet.create({
  shortItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
  },
});