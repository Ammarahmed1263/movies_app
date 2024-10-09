import {hs, vs} from '@styles/metrics';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';

export interface PaginationProps extends TouchableOpacityProps{
  containerStyle?: StyleProp<ViewStyle>;
  dotsLength: number;
  activeDotIndex: number;
  setActiveIndex: (index: number) => void;
  dotStyle: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
  inactiveDotStyle?: StyleProp<ViewStyle>;
  inactiveDotOpacity?: number;
  inactiveDotScale?: number;
}

const Pagination: FC<PaginationProps> = ({
  containerStyle,
  dotsLength,
  activeDotIndex,
  activeDotStyle,
  dotStyle,
  inactiveDotStyle,
  inactiveDotOpacity = 1,
  inactiveDotScale = 1,
  setActiveIndex,
  ...props
}) => {
  return (
    <View style={[styles.paginationContainer, containerStyle]}>
      {Array.from({length: dotsLength}, (_, index) => (
        <TouchableOpacity
          key={index}
          disabled={activeDotIndex === index}
          hitSlop={7}
          onPress={() => setActiveIndex(index)}
          style={[
            styles.dot,
            dotStyle,
            index !== activeDotIndex ? [
              inactiveDotStyle,
              {
                opacity: inactiveDotOpacity,
                transform:
                  inactiveDotScale !== undefined
                    ? [{scale: inactiveDotScale}]
                    : undefined,
              },
            ]
            : activeDotStyle,
          ]}
          {...props}
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
    // marginHorizontal: hs(8),
  },
});

export default Pagination;
