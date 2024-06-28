import {Pressable, Text, StyleSheet, View} from 'react-native';
import {useTheme} from '../../store/context/ThemeContext';

function Button({ flat, textStyle, style, children, onPress, customView, customViewStyle }) {
  const {colors, fonts} = useTheme();

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
        style={[!flat && styles.innerButton]}
        onPress={onPress}
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
    elevation: 6,
    overflow: 'hidden',
  },
  innerButton: {
    // flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
});
