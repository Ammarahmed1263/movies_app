import { hs, vs } from '@styles/metrics';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

export interface PaginationProps {
  containerStyle?: object;
  dotsLength: number;
  activeDotIndex: number;
  dotStyle?: object;
  inactiveDotStyle?: object;
  inactiveDotOpacity?: number;
  inactiveDotScale?: number;
}

const Pagination: FC<PaginationProps> = ({
  containerStyle,
  dotsLength,
  activeDotIndex,
  dotStyle,
  inactiveDotStyle,
  inactiveDotOpacity,
  inactiveDotScale,
}) => {

  return (
    <View style={[styles.paginationContainer, containerStyle]}>
      {Array.from({ length: dotsLength }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            dotStyle,
            index !== activeDotIndex && [inactiveDotStyle, { opacity: inactiveDotOpacity, transform: [{ scale: inactiveDotScale }] }],
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vs(20),
  },
  dot: {
    marginHorizontal: hs(5),
  },
});

export default Pagination;
