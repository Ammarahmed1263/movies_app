import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import i18n from '../i18n';
import {useEffect, useState} from 'react';
import {I18nManager, StatusBar, Switch, View} from 'react-native';
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

function ProfileScreen() {
  const [themeActive, setThemeActive] = useState(false);
  const [languageArabic, setLanguageArabic] = useState(false);
  const [user, setUser] = useState<string | undefined>(undefined);
  const {toggleTheme, theme, colors} = useTheme();

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
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        marginTop: StatusBar.currentHeight,
      }}>
      
      <View style={{alignItems: 'center'}}>
        <AppText variant="heading">{auth().currentUser?.email}</AppText>
        <AppText variant="body" style={{color: colors.primary700}}>
          {new Date(auth().currentUser?.metadata.creationTime ?? '').toDateString()}
        </AppText>
      </View>
      {/* <View style={{flexDirection: 'row'}}>
        <AppText>Dark Mode: </AppText>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={themeActive ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAppTheme}
          value={themeActive}
        />
      </View> */}
      <SettingItem
        icon="bell"
        label="Notifications"
        onPress={() => console.log('notification sent')}
        type="toggle"
        isToggled={true}
      />
      <SettingItem
        icon="moon"
        label="Dark Mode"
        onPress={toggleAppTheme}
        type="toggle"
        isToggled={themeActive}
      />
      <SettingItem
        icon="globe"
        label="Language"
        onPress={toggleAppLanguage}
        type="select"
        value={i18n.language === 'ar' ? 'Arabic' : 'English'}
        isToggled={languageArabic}
      />
      {/* <View style={{flexDirection: 'row'}}>
        <AppText>Arabic: </AppText>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={languageArabic ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAppLanguage}
          value={languageArabic}
        />
      </View> */}
      <View>
        <AppButton variant='regular' onPress={handleSignOut} flat style={{minHeight: 30}}>
          Sign out
        </AppButton>
        <AppButton
          variant="body"
          onPress={handleDeleteAccount}
          style={{minHeight: 30}}
          textStyle={{color: colors.error}}
          flat>
          Delete Account
        </AppButton>
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: vs(120)}}>
        <AppText
          variant="caption"
          style={{maxWidth: width / 2, textAlign: 'center'}}>
          Copyright©2023-2024 Ammar Ahmed, All rights reserved
        </AppText>
      </View>
    </View>
  );
}

export default ProfileScreen;
