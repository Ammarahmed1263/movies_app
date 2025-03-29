import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import SettingItem from '@molecules/SettingItem';
import ListsFlatlist from '@organisms/ListsFlatlist';
import ProfileHeader from '@organisms/ProfileHeader';
import auth from '@react-native-firebase/auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {userLogout} from '@services/authService';
import {
  deleteUser,
  getUserProfile,
  updateUserPreferences,
} from '@services/userService';
import {hs, vs, width} from '@styles/metrics';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  I18nManager,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import Config from 'react-native-config';
import RNRestart from 'react-native-restart';
import Feather from 'react-native-vector-icons/Feather';
import {ContactUsMessage} from '../constants';
import i18n from '../i18n';
import {useAppSelector} from '@hooks/useRedux';
const Icon = Feather as any;

function ProfileScreen() {
  const [themeActive, setThemeActive] = useState(false);
  const [languageArabic, setLanguageArabic] = useState(false);
  const [notification, setNotification] = useState(false);
  const {toggleTheme, theme, colors} = useTheme();
  const {t} = useTranslation();
  const {userToken} = useAppSelector(state => state.user);

  console.log('user data here: ', userToken);

  const toggleAppTheme = async () => {
    setThemeActive(prev => !prev);

    toggleTheme();

    await updateUserPreferences({
      theme: theme === 'dark' ? 'light' : 'dark',
    });
  };

  const toggleAppLanguage = async () => {
    let language = i18n.language;
    let newLanguage = language === 'en' ? 'ar' : 'en';

    setLanguageArabic(prev => !prev);
    i18n.changeLanguage(newLanguage);
    I18nManager.forceRTL(newLanguage === 'ar');

    await updateUserPreferences({
      language: newLanguage,
    });
    RNRestart.restart();
  };

  const toggleNotification = async () => {
    let newNotification = !notification;
    setNotification(prev => !prev);
    await updateUserPreferences({
      notification: newNotification,
    });
  };

  const handleSignOut = async () => {
    try {
      await userLogout();
    } catch (error) {
      console.log('oops user failed to logout', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
    } catch (error) {
      console.log('oops user failed to delete', error);
    }
  };

  const handleSendMail = async () => {
    const email = Config.SUPPORT_MAIL;
    const subject = 'Support Request - Movies Corn';
    const body = encodeURIComponent(
      ContactUsMessage(auth().currentUser?.email),
    );

    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${body}`;

    Linking.canOpenURL(mailtoURL)
      .then(supported => {
        if (!supported) {
          Alert.alert('Error', 'Unable to open email client.');
        } else {
          Linking.openURL(mailtoURL);
        }
      })
      .catch(err => console.error('Error opening email client:', err));
  };

  useEffect(() => {
    (async () => {
      const userData = await getUserProfile();
      setThemeActive(theme === 'dark' ? true : false);
      setLanguageArabic(i18n.language === 'ar' ? true : false);
      // setUser(userData);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={styles.scrollContainer}>
        <ProfileHeader />
        <View>
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
          />
          <SettingItem
            icon="moon"
            label={t('dark_mode')}
            onPress={toggleAppTheme}
            type="toggle"
            isToggled={themeActive}
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
                    name={themeActive ? 'moon' : 'sun'}
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
            onPress={toggleAppLanguage}
            type="select"
            value={i18n.language === 'ar' ? t('arabic') : t('english')}
            isToggled={languageArabic}
          />
        </View>

        <ListsFlatlist title={t('lists')} seeAll />

        <View>
          <View style={styles.sectionHeader}>
            <Icon name="help-circle" size={25} color={colors.paleShade} />
            <AppText variant="heading" style={{marginStart: hs(8)}}>
              {t('support')}
            </AppText>
          </View>

          <SettingItem
            icon="headphones"
            label={t('contact_us')}
            onPress={handleSendMail}
            type="select"
          />

          <SettingItem
            icon="info"
            label={`${t('about')} ${t('movie')} ${t('corn')}`}
            onPress={() => SheetManager.show('about-app')}
            type="select"
            isToggled={languageArabic}
          />
        </View>

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
    marginTop: Platform.OS === 'ios' ? vs(-10) : 0,
    paddingTop: Platform.OS === 'ios' ? 0 : vs(30),
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
    minHeight: 30,
    alignSelf: 'flex-start',
  },
  footer: {
    flex: 1,
    paddingBottom: vs(Platform.OS === 'ios' ? 80 : 120),
  },
  copyrights: {
    maxWidth: width / 2,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: vs(10),
  },
});
