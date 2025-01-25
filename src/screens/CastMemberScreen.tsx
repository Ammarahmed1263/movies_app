import {FC, useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import Image from '@atoms/AppImage.tsx';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '@atoms/AppButton';

import {useTheme} from '@contexts/ThemeContext';
import TextSeeMore from '@atoms/SeeMoreText';
import {getGenderString, getImageUrl} from '@utils';
import MoviesSection from '@organisms/MoviesSection';
import {getMemberDetails, getMemberCredits} from '@services/castMemberService';
import {CastMemberScreenProps} from 'types/mainStackTypes';
import {MemberCreditArray, MemberDetails} from 'types/castTypes';
import AppText from '@atoms/AppText';
import {hs, ms, vs, width} from '@styles/metrics';
import DetailPillItem from '@molecules/DetailPillItem';
import NavigationHeader from '@organisms/NavigationHeader';
import AppLoading from '@atoms/AppLoading';

const CastMemberScreen: FC<CastMemberScreenProps> = ({route}) => {
  const {id} = route.params;
  const [details, setDetails] = useState<MemberDetails | undefined>(undefined);
  const [credits, setCredits] = useState<MemberCreditArray>([]);
  const navigation = useNavigation();
  const {colors} = useTheme();

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
    return (
      <AppLoading
        size={width}
        speed={1.25}
        source={require('../assets/lottie/loading_cast.json')}
      />
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <NavigationHeader
        onGoBack={() => navigation.goBack()}
        style={{
          marginHorizontal: hs(10),
          paddingTop: (StatusBar.currentHeight ?? vs(50)) + vs(15),
        }}
      />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            ...styles.imageContainer,
            borderColor: colors.secondary500,
            backgroundColor: colors.primary500,
            shadowColor: colors.secondary500,
          }}>
          <Image
            source={getImageUrl(details?.profile_path)}
            resizeMode="stretch"
          />
        </View>
      </View>

      <View
        style={{alignItems: 'center', marginBottom: vs(8), marginTop: vs(16)}}>
        <AppText
          variant="heading"
          style={{
            color: colors.paleShade,
            lineHeight: vs(28),
          }}>
          {details.name}
        </AppText>
        <AppText
          variant="caption"
          style={{
            lineHeight: vs(18),
            color: colors.paleShade,
          }}>
          {details.place_of_birth}
        </AppText>
      </View>

      <View
        style={{...styles.shortDetails, backgroundColor: colors.primary700}}>
        <DetailPillItem
          label="Gender"
          value={getGenderString(details.gender)}
        />
        <DetailPillItem label="Birthday" value={details.birthday} />
        <DetailPillItem
          label="Known for"
          value={details.known_for_department}
        />
        <DetailPillItem
          label="Popularity"
          value={Math.round(details.popularity * 10) / 10}
          border={false}
        />
      </View>

      <View style={{marginHorizontal: hs(10), marginVertical: vs(8)}}>
        <AppText variant="heading">Biography</AppText>
        <TextSeeMore
          variant="regular"
          style={{
            color: colors.paleShade,
          }}
          text={details.biography.replace(/\n/g, ' ') || 'N/A'}
          maxChars={250}
        />
      </View>
      <MoviesSection
        movies={credits.sort(
          (a, b) => Number(b.vote_average) - Number(a.vote_average),
        )}
        length={15}
        topic="Known For"
      />
    </ScrollView>
  );
};

export default CastMemberScreen;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    width: hs(220),
    aspectRatio: 1 / 1,
    borderRadius: hs(110),
    borderWidth: hs(1),
    elevation: 50,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  shortDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: hs(10),
    marginVertical: vs(8),
    paddingVertical: vs(8),
    paddingHorizontal: hs(4),
    borderRadius: hs(40),
    overflow: 'hidden',
  },
});
