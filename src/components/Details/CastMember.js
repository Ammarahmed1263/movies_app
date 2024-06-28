import {View, Image, Text, StyleSheet} from 'react-native';
import ENDPOINT from '../../utils/Constants';
import {useTheme} from '../../store/context/ThemeContext';

function Member({details}) {
  const {colors, fonts} = useTheme();

  // console.log(details.character);
  return (
    <View style={{...styles.container, borderColor: colors.secondary500, borderRadius: 20}}>
      <Image
        source={{uri: ENDPOINT.image + details.profile_path}}
        style={styles.image}
      />
      <View style={{...styles.details, borderColor: colors.secondary500}}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.bold,
            color: colors.paleShade,
          }}>
          {details.original_name}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            fontSize: 15,
            fontFamily: fonts.regular,
            color: colors.paleShade,
          }}>
          {details.character}
        </Text>
      </View>
    </View>
  );
}

export default Member;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 15,
    marginBottom: 20,
    borderWidth: 2,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    minWidth: 65,
    maxWidth: 75,
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
    resizeMode: 'stretch',
  },
  details: {
    flex: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // borderRightWidth: 0.9, 
    // borderTopWidth: 2.1,
    // borderBottomWidth: 2.1,
    // borderTopRightRadius: 20,
    // borderBottomRightRadius: 20,
    maxWidth: 250,
    maxHeight: 120,
    minHeight: 100,
  },
});
