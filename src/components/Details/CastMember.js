import {View, Image, Text, StyleSheet} from 'react-native';
import ENDPOINT from '../../utils/Constants';
import {useTheme} from '../../store/context/ThemeContext';

function Member({details}) {
  const {colors, fonts} = useTheme();

  // console.log(details.character);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={{...styles.container, borderColor: colors.secondary500}}>
        <Image
          source={{uri: ENDPOINT.image + details.profile_path}}
          style={styles.image}
        />
      </View>
      <View style={{...styles.details, borderColor: colors.secondary500}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.bold,
            color: colors.paleShade,
          }}>
          {details.original_name.length > 15 ? details.original_name.split(' ')[0] : details.original_name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: fonts.regular,
            color: colors.paleShade,
          }}>
          {details.character.length > 15 ? details.character.split(' ')[0] :  details.character}

        </Text>
      </View>
    </View>
  );
}

export default Member;

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 45,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  details: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  }, 
});
