import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import ENDPOINT from '../../utils/Constants';
import {useTheme} from '../../store/context/ThemeContext';
import {useNavigation} from '@react-navigation/native';

function Member({details}) {
  const {colors, fonts} = useTheme();
  const navigation = useNavigation();

  // console.log(details.character);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CastMemberDetails', {id: details.id})}
      style={styles.TouchableOpacityContainer}>
      <View style={styles.container}>
        <View style={{ ...styles.imageContainer, borderColor: colors.secondary500}}>
          <Image
            source={{uri: ENDPOINT.image + details.profile_path}}
            style={styles.image}
          />
        </View>
      </View>
      <View style={{...styles.details, borderColor: colors.secondary600}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.bold,
            color: colors.paleShade,
          }}>
          {details.original_name.length >= 14
            ? details.original_name.split(' ')[0]
            : details.original_name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: fonts.regular,
            color: colors.paleShade,
          }}>
          {details.character.length >= 15
            ? details.character.split(' ')[0]
            : details.character}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default Member;

const styles = StyleSheet.create({
  TouchableOpacityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    maxWidth: 135
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 45,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
