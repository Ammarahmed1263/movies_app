import axios from 'axios';
import {useEffect, useState} from 'react';
import {Image, ScrollView, StatusBar, Text, View} from 'react-native';
import ENDPOINT, {API_KEY} from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/ui/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../store/context/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextSeeMore from '../components/ui/TextSeeMore';

const options = {
  method: 'GET',
  params: {language: 'en-US', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const CastMemberScreen = ({route}) => {
  const {id} = route.params;
  const [details, setDetails] = useState(null);
  const navigation = useNavigation();
  const {colors, fonts} = useTheme();

  console.log('member id', id);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios(
          `https://api.themoviedb.org/3/person/${id}`,
          options,
        );
        console.log(response.data);
        setDetails(response.data);
      } catch (e) {
        console.log('member retrieval error', e);
      }
    })();
  }, []);

  if (!details) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView>        
        <View>
          <Button
            onPress={() => navigation.goBack()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 52,
              width: 52,
            }}
            customView>
            <Icon name="arrow-back-outline" size={28} color={colors.paleShade} />
          </Button>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              alignItems: 'center',
              overflow: 'hidden',
              width: 240,
              height: 240,
              borderRadius: 140,
              borderWidth: 1,
              borderColor: 'chocolate',
              elevation: 40,
              shadowColor: 'chocolate'
            }}>
            <Image
              source={{uri: ENDPOINT.image + details.profile_path}}
              style={{width: 300, height: 300}}></Image>
          </View>
        </View>
        <View>
          
        </View>
        <TextSeeMore text={details.biography} maxChars={400} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CastMemberScreen;
