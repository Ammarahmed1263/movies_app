import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import SettingItem from '@molecules/SettingItem';
import notifee from '@notifee/react-native';
import ListsFlatlist from '@organisms/ListsFlatlist';
import ProfileHeader from '@organisms/ProfileHeader';
import auth from '@react-native-firebase/auth';
import {userLogout} from '@services/authService';
import {
  deleteUser,
  getCurrentUserId,
  updateUserPreferences,
} from '@services/userService';
import {hs, vs, width} from '@styles/metrics';
import {ContactUsMessage} from '../constants';
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
import i18n from '../i18n';
const Icon = Feather as any;

function ProfileScreen() {
  const [themeActive, setThemeActive] = useState(false);
  const [languageArabic, setLanguageArabic] = useState(false);
  const [user, setUser] = useState<string | undefined>(undefined);
  const {toggleTheme, theme, colors} = useTheme();
  const {t} = useTranslation();

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

  const handleNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
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
      const userData = getCurrentUserId();
      console.log('user profile: ', auth().currentUser?.email);
      setThemeActive(theme === 'dark' ? true : false);
      setLanguageArabic(i18n.language === 'ar' ? true : false);
      setUser(userData);
      console.log('user id in profile: ', userData);
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
            onPress={() => console.log('notification sent')}
            type="toggle"
            isToggled={false}
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
              Support
            </AppText>
          </View>

          <SettingItem
            icon="headphones"
            label="Contact Us"
            onPress={handleSendMail}
            type="select"
          />

          <SettingItem
            icon="info"
            label="About MovieCorn"
            onPress={() => {}}
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
            {/* <AppButton
              variant="body"
              onPress={handleSendMail}
              style={styles.flatButton}
              textStyle={{color: colors.success}}
              flat>
              send mail
            </AppButton> */}
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
