import {Pressable, Text, StyleSheet, View} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

function Button({ flat, textStyle, style, children, onPress, customView, customViewStyle }) {
  const {colors, fonts} = useTheme();
  const [clicked, setClicked] = useState(false);

  const pressAction = () => {
    onPress && onPress();
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  }
  return (
    <View
      style={[
        styles.buttonContainer,
        {backgroundColor: colors.secondary500},
        style,
        flat && {backgroundColor: '', elevation: 0},
      ]}>
      <Pressable
        android_ripple={flat ? null : {color: colors.secondary600}}
        style={[!flat && styles.innerButton, (flat && clicked) && {opacity: 0.5}, {justifyContent: 'center', flex: 1}]}
        onPress={pressAction}
      >
        {customView ? (
          <View style={customViewStyle}>{children}</View>
        ) : (
          <Text
            style={[
              styles.text,
              {
                fontFamily: fonts.bold,
                color: colors.paleShade,
              },
              textStyle,
              flat && {color: colors.secondary500},
            ]}>
            {children}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    margin: 2,
    minHeight: 50,
    overflow: 'hidden',
  },
  innerButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    width: '100%',
    height: '100%'
  },
  text: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
});
