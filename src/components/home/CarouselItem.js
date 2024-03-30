import {View, Image, Text, StyleSheet} from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import ENDPOINT from '../../utils/Constants';

function CarouselItem({item}) {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{uri: ENDPOINT.image + item.poster_path}}
        style={styles.cardImage}
      />
        <Text
          style={styles.title}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.title}
        </Text>
      </View>
  );
}

export default CarouselItem;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    minHeight: 400,
    // backgroundColor: 'white',
  },
  cardImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: GlobalStyles.secondary500,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: GlobalStyles.fontRegular,
    color: 'white',
    textAlign: 'center',
    marginTop: 15, 
    alignSelf: 'center'
  }
});
