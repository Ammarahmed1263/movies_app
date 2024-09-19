import {FC, useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Image from '@atoms/AppImage.tsx';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '@atoms/AppButton';

import {useTheme} from '@contexts/ThemeContext';
import TextSeeMore from '@atoms/SeeMoreText';
import {getGenderString, getImageUrl} from '@utils/index';
import Heading from '@atoms/AppHeading';
import MoviesList from '@organisms/MoviesSection';
import {getMemberDetails, getMemberCredits} from '@services/castMemberService';
import { CastMemberScreenProps } from 'types/mainStackTypes';
import { MemberCreditArray, MemberDetails } from 'types/castTypes';

const CastMemberScreen: FC<CastMemberScreenProps> = ({route}) => {
  const {id} = route.params;
  const [details, setDetails] = useState<MemberDetails | undefined>(undefined);
  const [credits, setCredits] = useState<MemberCreditArray>([]);
  const navigation = useNavigation();
  const {colors, fonts} = useTheme();

  console.log('member id', id);
  useEffect(() => {
    (async () => {
      try {
        const response = await getMemberDetails(id);
        const response2 = await getMemberCredits(id);
        console.log('member details here: ', response);
        setCredits(response2.cast);
        setDetails(response);
      } catch (e) {
        console.log('member retrieval error', e);
      }
    })();
  }, []);

  if (!details) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginHorizontal: 10,
          paddingTop: StatusBar.currentHeight ?? 50 + 15,
        }}>
        <Button
          onPress={() => navigation.goBack()}
          style={{
            width: '13%',
            aspectRatio: 1 / 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          customView>
          <Icon name="arrow-back-outline" size={28} color={colors.paleShade} />
        </Button>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            ...styles.imageContainer,
            borderColor: colors.secondary500,
            shadowColor: colors.secondary500,
          }}>
          <Image
            uri={getImageUrl(details?.profile_path)}
            resizeMode="stretch"
          />
        </View>
      </View>
      <View style={{alignItems: 'center', marginVertical: 8}}>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 28,
            color: colors.paleShade,
          }}>
          {details.name}
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: 13,
            color: colors.paleShade,
          }}>
          {details.place_of_birth}
        </Text>
      </View>
      <View
        style={{...styles.shortDetails, backgroundColor: colors.primary700}}>
        <View style={{...styles.shortItem, borderColor: colors.primary500}}>
          <Text style={{fontFamily: fonts.regular, color: colors.primary500}}>
            Gender
          </Text>
          <Text style={{fontFamily: fonts.light, color: colors.primary500}}>
            {getGenderString(details.gender)}
          </Text>
        </View>
        <View style={{...styles.shortItem, borderColor: colors.primary500}}>
          <Text style={{fontFamily: fonts.regular, color: colors.primary500}}>
            Birthday
          </Text>
          <Text style={{fontFamily: fonts.light, color: colors.primary500}}>
            {details.birthday}
          </Text>
        </View>
        <View style={{...styles.shortItem, borderColor: colors.primary500}}>
          <Text style={{fontFamily: fonts.regular, color: colors.primary500}}>
            Known for
          </Text>
          <Text style={{fontFamily: fonts.light, color: colors.primary500}}>
            {details.known_for_department}
          </Text>
        </View>
        <View
          style={{...styles.shortItem, borderRightWidth: 0, paddingRight: 0}}>
          <Text style={{fontFamily: fonts.regular, color: colors.primary500}}>
            Popularity
          </Text>
          <Text style={{fontFamily: fonts.light, color: colors.primary500}}>
            {Math.round(details.popularity * 10) / 10}
          </Text>
        </View>
      </View>
      <View style={{marginHorizontal: 10, marginVertical: 8}}>
        <Heading>Biography</Heading>
        <TextSeeMore
          style={{
            color: colors.paleShade,
            fontFamily: fonts.regular,
            fontSize: 16,
          }}
          text={details.biography.replace(/\n/g, ' ')}
          maxChars={400}
        />
      </View>
      {credits && (
        <MoviesList
          movies={credits.sort(
            (a, b) => Number(b.vote_average) - Number(a.vote_average),
          )}
          length={15}
          topic="Top Movies"
        />
      )}
    </ScrollView>
  );
};

export default CastMemberScreen;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    width: 230,
    height: 230,
    borderRadius: 125,
    borderWidth: 1,
    elevation: 50,
  },
  shortDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 8,
    borderRadius: 40,
  },
  shortItem: {
    paddingRight: 8,
    alignItems: 'center',
    borderRightWidth: 1,
  },
});
