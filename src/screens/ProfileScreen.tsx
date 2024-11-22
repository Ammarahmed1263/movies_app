import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import i18n from '../i18n';
import {useEffect, useState} from 'react';
import {
  Alert,
  I18nManager,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AppButton from '@atoms/AppButton';
import {userLogout} from '@services/authService';
import RNRestart from 'react-native-restart';
import {
  deleteUser,
  getCurrentUserId,
  updateUserPreferences,
} from '@services/userService';
import {hs, vs, width} from '@styles/metrics';
import SettingItem from '@molecules/SettingItem';
import Icon from 'react-native-vector-icons/Feather';
import CollectionsList from '@organisms/CollectionsList';
import { useTranslation } from 'react-i18next';

function ProfileScreen() {
  const [themeActive, setThemeActive] = useState(false);
  const [languageArabic, setLanguageArabic] = useState(false);
  const [user, setUser] = useState<string | undefined>(undefined);
  const {toggleTheme, theme, colors} = useTheme();
  const { t } = useTranslation();

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
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              borderRadius: width / 6,
              width: width / 3,
              height: width / 3,
              backgroundColor: 'grey',
            }}
          />
          <AppText variant="heading">{auth().currentUser?.email}</AppText>
          <AppText variant="body" style={{color: colors.primary700}}>
            Joined:{' '}
            {new Date(
              auth().currentUser?.metadata.creationTime ?? '',
            ).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </AppText>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
              paddingHorizontal: 5,
            }}>
            <Icon
              name="settings"
              size={20}
              style={{padding: 5}}
              color={colors.paleShade}
            />
            <AppText variant="bold">{t("preferences")}</AppText>
          </View>
          <SettingItem
            icon="bell"
            label={t("notifications")}
            onPress={() => console.log('notification sent')}
            type="toggle"
            isToggled={false}
          />
          <SettingItem
            icon="moon"
            label={t("dark_mode")}
            onPress={toggleAppTheme}
            type="toggle"
            isToggled={themeActive}
            switchProps={{
              backgroundActive: colors.primary600,
              backgroundInactive: colors.secondary500,
              circleActiveColor: '#fefefe',
              circleInActiveColor: '#fefefe',
              circleBorderActiveColor: colors.secondary500,
              circleBorderInactiveColor: colors.primary700,
              renderInsideCircle: () => {
                return (
                  <Icon
                    name={themeActive ? 'moon' : 'sun'}
                    color="#333333"
                    size={15}
                  />
                );
              },
            }}
          />
          <SettingItem
            icon="globe"
            label={t("language")}
            onPress={toggleAppLanguage}
            type="select"
            value={i18n.language === 'ar' ? 'Arabic' : 'English'}
            isToggled={languageArabic}
          />
        </View>

        <CollectionsList title={t("collections")} />

        <View
          style={{flex: 1, paddingBottom: vs(Platform.OS === 'ios' ? 80 : 120)}}>
          <AppButton
            variant="regular"
            onPress={handleSignOut}
            flat
            style={styles.flatButton}>
            {t('sign_out')}
          </AppButton>
          <AppButton
            variant="body"
            onPress={() => Alert.alert('i was clicked')}
            style={styles.flatButton}
            textStyle={{color: colors.error}}
            flat
            >
            {t("delete_account")}
          </AppButton>
          <AppText
            variant="caption"
            style={styles.copyrights}>
            Copyright©2023-2024 Ammar Ahmed, All rights reserved
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;


const styles = StyleSheet.create({
  flatButton: {
    minHeight: 30,
    alignSelf: 'flex-start'
  },
  copyrights: {
    maxWidth: width / 2,
    textAlign: 'center',
    alignSelf: 'center',
  }
})
