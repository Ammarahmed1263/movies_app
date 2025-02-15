import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {hs, vs, width} from '@styles/metrics';

interface LabeledBoxProps {
  label: string;
  value: string | number;
  border?: boolean;
}

const LabeledBox: FC<LabeledBoxProps> = ({label, value, border = true}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.detailsBox, {borderColor: colors.secondary500}]}>
      <View style={styles.labelContainer}>
        <AppText
          variant="regular"
          numberOfLines={1}
          style={{
            ...styles.label,
            backgroundColor: colors.primary500,
            color: colors.paleShade,
          }}>
          {label}
        </AppText>
      </View>
      <AppText
        variant="heading"
        numberOfLines={1}
        style={{
          ...styles.value,
          color: colors.paleShade,
        }}>
        {value}
      </AppText>
    </View>
  );
};

export default LabeledBox;

const styles = StyleSheet.create({
  detailsBox: {
    width: width / 2 - hs(20),
    borderWidth: hs(3),
    borderRadius: hs(6),
    alignItems: 'center',
    justifyContent: 'center',
    padding: hs(5),
  },
  labelContainer: {
    flex: 1,
    textAlign: 'center',
    top: vs(-18),
    marginBottom: vs(-25),
  },
  label: {
    paddingHorizontal: hs(3),
  },
  value: {
    paddingVertical: vs(8),
    // backgroundColor: 'red',
  },
});
