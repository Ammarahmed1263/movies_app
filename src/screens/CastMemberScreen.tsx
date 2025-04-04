import Image from '@atoms/AppImage.tsx';
import {useNavigation} from '@react-navigation/native';
import {FC, useEffect, useState} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet, View} from 'react-native';

import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import TextSeeMore from '@atoms/SeeMoreText';
import {useTheme} from '@contexts/ThemeContext';
import LabeledBox from '@molecules/LabeledBox';
import MoviesSection from '@organisms/MoviesSection';
import NavigationHeader from '@organisms/NavigationHeader';
import {getMemberCredits, getMemberDetails} from '@services/castMemberService';
import {hs, vs, width} from '@styles/metrics';
import {calculateAge, convertToArabicNumerals, getImageUrl} from '@utils';
import {useTranslation} from 'react-i18next';
import {MemberCreditArray, MemberDetails} from 'types/castTypes';
import {CastMemberScreenProps} from 'types/mainStackTypes';
import {castMemberFilter, isIOS} from '../constants';

const CastMemberScreen: FC<CastMemberScreenProps> = ({route}) => {
  const {id} = route.params;
  const [details, setDetails] = useState<MemberDetails | undefined>(undefined);
  const [credits, setCredits] = useState<MemberCreditArray>([]);
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {t} = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const response = await getMemberDetails(id);
        const response2 = await getMemberCredits(id);
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
        colorFilters={castMemberFilter(colors)}
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
            resizeMode="cover"
            viewStyle={styles.image}
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
          {details.name},{' '}
          {convertToArabicNumerals(calculateAge(details.birthday))}
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

      <View style={styles.detailsContainer}>
        <LabeledBox
          label={t('popularity')}
          value={convertToArabicNumerals(
            Math.round(details.popularity * 10) / 10 + '',
          )}
        />
        <LabeledBox
          label={t('known_for')}
          value={details.known_for_department}
        />
      </View>

      <View style={{marginHorizontal: hs(15), marginVertical: vs(8)}}>
        <AppText variant="heading">{t('biography')}</AppText>
        <TextSeeMore
          variant="regular"
          style={{
            color: colors.paleShade,
          }}
          text={details.biography || t('N/A')}
          maxChars={250}
        />
      </View>

      <View style={styles.movies}>
        <MoviesSection
          movies={credits.sort(
            (a, b) =>
              Number(b.vote_count) +
              Number(b.popularity) -
              (Number(a.vote_count) + Number(a.popularity)),
          )}
          length={15}
          topic={t('popular_for')}
        />
      </View>
    </ScrollView>
  );
};

export default CastMemberScreen;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: !isIOS ? 'hidden' : 'visible',
    width: hs(200),
    aspectRatio: 1 / 1,
    borderRadius: hs(110),
    borderWidth: hs(1),
    ...Platform.select({
      android: {
        elevation: 30,
      },
      ios: {
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 30,
      },
    }),
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderRadius: hs(110),
  },
  detailsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: hs(15),
    marginVertical: vs(15),
  },
  movies: {
    marginVertical: vs(20),
  },
});
