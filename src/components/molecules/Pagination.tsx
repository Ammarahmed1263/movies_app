import { hs, vs } from '@styles/metrics';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export interface PaginationProps {
  containerStyle?: object;
  dotsLength: number;
  activeDotIndex: number;
  setActiveIndex: (index: number) => void
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
  setActiveIndex
}) => {

  return (
    <View style={[styles.paginationContainer, containerStyle]}>
      {Array.from({ length: dotsLength }, (_, index) => (
        <TouchableOpacity
          key={index}
          disabled={activeDotIndex === index}
          hitSlop={25}
          onPress={() => setActiveIndex(index)}
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
    marginHorizontal: hs(6),
  },
});

export default Pagination;
