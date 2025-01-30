import AppText from '@atoms/AppText';
import {hs, vs, width} from '@styles/metrics';
import LottieView from 'lottie-react-native';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, View} from 'react-native';

interface EmptySearchProps {
  keyword: string;
}

const EmptySearch: FC<EmptySearchProps> = ({keyword}) => {
  const {t} = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: hs(30),
        marginBottom: vs(100),
      }}>
      <LottieView
        source={
          Platform.OS === 'ios'
            ? require('../../assets/lottie/no_search_results(2).json')
            : require('../../assets/lottie/no_search_results.json')
        }
        style={{
          width: Platform.OS === 'ios' ? width * 0.7 : width * 0.8,
          aspectRatio: 1 / 1,
        }}
        autoPlay
        loop
      />
      <AppText variant="heading" style={{textAlign: 'center'}}>
        {t('empty_search', {keyword})}
      </AppText>
    </View>
  );
};

export default EmptySearch;
