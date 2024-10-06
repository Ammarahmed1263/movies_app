import {useCallback} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import MoviesCarousel from '@organisms/MoviesCarousel';
import MoviesSection from '@organisms/MoviesSection';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@contexts/ThemeContext';

function HomeScreen() {
  const {t} = useTranslation();
  const {theme} = useTheme();


  const onRefresh = useCallback(() => {
    setTimeout(() => {
    }, 5000);
  }, []);


  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl
        //     progressViewOffset={StatusBar.currentHeight}
        //     refreshing={state.refreshing}
        //     onRefresh={onRefresh}
        //     colors={[colors.secondaryShadow, colors.secondary600]}
        //     tintColor={colors.primary500}
        //     progressBackgroundColor={colors.primary500}
        //   />
        // }
        >
        <View style={{flex: 3}}>
          <MoviesCarousel category="now_playing" />
        </View>
        <View style={{flex: 1}}>
          <MoviesSection
            category="trending"
            time_window='day'
            topic={t('trending_today')}
            seeAll
          />
          <MoviesSection
            category="upcoming"
            topic={t('upcoming')}
            seeAll
          />
          <MoviesSection
            category="popular"
            topic={t('popular')}
            seeAll
          />
          <MoviesSection
            category="top_rated"
            topic={t('top_rated')}
            seeAll
          />
        </View>
      </ScrollView>
    </>
  );
}

export default HomeScreen;
