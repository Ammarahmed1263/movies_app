import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import i18n from '../i18n';
import {useEffect, useState} from 'react';
import {I18nManager, Switch, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import AppButton from '@atoms/AppButton';
import {userLogout} from '@services/authService';
import RNRestart from 'react-native-restart';
import {getCurrentUserId, updateUserPreferences} from '@services/userService';

function ProfileScreen() {
  const [themeActive, setThemeActive] = useState(false);
  const [languageArabic, setLanguageArabic] = useState(false);
  const [user, setUser] = useState<string | undefined>(undefined);
  const {toggleTheme, theme} = useTheme();

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
  }

  const handleSignOut = async () => {
    try {
      await userLogout();
    } catch (error) {
      console.log('oops user failed to logout', error);
    }
  };

  useEffect(() => {
    (async () => {
      const userData = getCurrentUserId();
      setThemeActive(theme === 'dark' ? true : false);
      setLanguageArabic(i18n.language === 'ar' ? true : false);
      setUser(userData);
      console.log('user data in profile: ', userData);
    })();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AppText>user Id: {user}</AppText>
      <View style={{flexDirection: 'row'}}>
        <AppText>Dark Mode: </AppText>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={themeActive ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAppTheme}
          value={themeActive}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <AppText>Arabic: </AppText>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={languageArabic ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAppLanguage}
          value={languageArabic}
        />
      </View>
      <AppText>
        Created at: {auth().currentUser?.metadata.creationTime?.split('T')[0]}
      </AppText>
      <AppButton onPress={handleSignOut} flat>
        Sign out
      </AppButton>
    </View>
  );
}

export default ProfileScreen;
