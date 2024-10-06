import {FC, useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import Image from '@atoms/AppImage.tsx';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '@atoms/AppButton';

import {useTheme} from '@contexts/ThemeContext';
import TextSeeMore from '@atoms/SeeMoreText';
import {getGenderString, getImageUrl} from '@utils/index';
import MoviesSection from '@organisms/MoviesSection';
import {getMemberDetails, getMemberCredits} from '@services/castMemberService';
import {CastMemberScreenProps} from 'types/mainStackTypes';
import {MemberCreditArray, MemberDetails} from 'types/castTypes';
import AppText from '@atoms/AppText';
import {hs, vs} from '@styles/metrics';
import DetailPillItem from '@molecules/DetailPillItem';

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
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AppText variant='heading'>Loading...</AppText>
    </View>
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
            width: hs(45),
            aspectRatio: 1 / 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          customView>
          <Icon name="chevron-back" size={28} color={colors.paleShade} />
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
            lineHeight: 28,
          }}>
          {details.name}
        </AppText>
        <AppText
          variant="caption"
          style={{
            lineHeight: 13,
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

      <View style={{marginHorizontal: 10, marginVertical: 8}}>
        <AppText variant="heading">Biography</AppText>
        <TextSeeMore
          variant="regular"
          style={{
            color: colors.paleShade,
          }}
          text={details.biography.replace(/\n/g, ' ')}
          maxChars={250}
        />
      </View>
      {credits && (
        <MoviesSection
          movies={credits.sort(
            (a, b) => Number(b.vote_average) - Number(a.vote_average),
          )}
          length={15}
          topic="Known For"
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
    marginHorizontal: 10,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 40,
    overflow: 'hidden',
  },
  shortItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
  },
});
