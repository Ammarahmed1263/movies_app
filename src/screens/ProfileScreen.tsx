import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {isIOS} from '@constants';
import {useTheme} from '@contexts/ThemeContext';
import {useProfileSettings} from '@hooks/useProfileSettings';
import SettingItem from '@molecules/SettingItem';
import ListsFlatlist from '@organisms/ListsFlatlist';
import ProfileHeader from '@organisms/ProfileHeader';
import {userLogout} from '@services/authService';
import {deleteUser} from '@services/userService';
import {hs, vs, width} from '@styles/metrics';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import RNRestart from 'react-native-restart';
import Feather from 'react-native-vector-icons/Feather';
const Icon = Feather as any;
import sendMail from 'utils/sendMail';

function ProfileScreen() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {
    notification,
    language,
    theme,
    toggleTheme,
    toggleLanguage,
    toggleNotification,
  } = useProfileSettings();

  const handleSignOut = async () => {
    try {
      await userLogout();
      RNRestart.restart();
    } catch (error) {
      console.log('oops user failed to logout', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      RNRestart.restart();
    } catch (error) {
      console.log('oops user failed to delete', error);
    }
  };

  useEffect(() => {
    (async () => {
      // const user = await getUserProfile();
      // if (user) {
      //   dispatch(updateUserPreferencesAction({language: user?.language}));
      // }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={styles.scrollContainer}>
        <ProfileHeader />

        <View style={styles.sectionHeader}>
          <Icon name="settings" size={25} color={colors.paleShade} />
          <AppText variant="heading" style={{marginStart: hs(8)}}>
            {t('preferences')}
          </AppText>
        </View>
        <SettingItem
          icon="bell"
          label={t('notifications')}
          onPress={toggleNotification}
          type="toggle"
          isToggled={notification}
          switchProps={{
            backgroundActive: colors.secondary500,
          }}
        />
        <SettingItem
          icon="moon"
          label={t('dark_mode')}
          onPress={toggleTheme}
          type="toggle"
          isToggled={theme === 'dark'}
          switchProps={{
            backgroundActive: colors.primary700,
            backgroundInactive: colors.secondary500,
            circleActiveColor: colors.primary500,
            circleInActiveColor: colors.primary500,
            circleBorderActiveColor: colors.secondary500,
            circleBorderInactiveColor: colors.primary700,
            renderInsideCircle: () => {
              return (
                <Icon
                  name={theme === 'dark' ? 'moon' : 'sun'}
                  color={colors.paleShade}
                  size={15}
                />
              );
            },
          }}
        />
        <SettingItem
          icon="globe"
          label={t('language')}
          onPress={toggleLanguage}
          type="select"
          value={language === 'ar' ? t('arabic') : t('english')}
          isToggled={language === 'ar'}
        />

        <ListsFlatlist title={t('lists')} seeAll />

        <View style={styles.sectionHeader}>
          <Icon name="help-circle" size={25} color={colors.paleShade} />
          <AppText variant="heading" style={{marginStart: hs(8)}}>
            {t('support')}
          </AppText>
        </View>

        <SettingItem
          icon="headphones"
          label={t('contact_us')}
          onPress={sendMail}
          type="select"
        />

        <SettingItem
          icon="info"
          label={`${t('about')} ${t('movie')} ${t('corn')}`}
          onPress={() => SheetManager.show('about-app')}
          type="select"
        />

        <View style={styles.footer}>
          <View style={{paddingHorizontal: hs(12)}}>
            <AppButton
              variant="regular"
              onPress={handleSignOut}
              style={styles.flatButton}
              flat>
              {t('sign_out')}
            </AppButton>
            <AppButton
              variant="body"
              onPress={() =>
                SheetManager.show('delete-account', {
                  payload: {
                    onDelete: handleDeleteAccount,
                  },
                })
              }
              style={styles.flatButton}
              textStyle={{color: colors.error}}
              flat>
              {t('delete_account')}
            </AppButton>
          </View>
          <AppText variant="caption" style={styles.copyrights}>
            {t('copyrights')}
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: isIOS ? vs(-10) : 0,
    paddingTop: isIOS ? 0 : vs(30),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: vs(25),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingTop: vs(10),
    paddingHorizontal: hs(15),
  },
  flatButton: {
    minHeight: vs(30),
    alignSelf: 'flex-start',
  },
  footer: {
    paddingBottom: vs(isIOS ? 80 : 120),
    justifyContent: 'flex-start',
  },
  copyrights: {
    width: width / 2,
    flexWrap: 'wrap',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: vs(10),
  },
});
