import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import i18n from '../i18n';
import {useCallback, useEffect, useState} from 'react';
import {I18nManager, StatusBar, Switch, View} from 'react-native';
import auth, { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AppButton from '@atoms/AppButton';
import RNRestart from 'react-native-restart'

function ProfileScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [user, setUser] = useState<string | undefined>(undefined);
  const {toggleTheme, theme} = useTheme();
  console.log('theme now: ', theme, user);
  console.log(i18n.language);
  const toggleAppTheme = async () => {
    toggleTheme();
    setIsEnabled(previousState => !previousState);
    await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .set(
      {
        userPreferences: {
          theme: theme === 'dark' ? 'light' : 'dark'
        },
      },
      {merge: true},
    );
    // RNRestart.restart();
    // persist and reload app
  };

  const toggleAppLanguage = async () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('ar')
      I18nManager.forceRTL(true);
    } else {
      i18n.changeLanguage('en');
      I18nManager.forceRTL(false);
    }

    setIsEnabled2(previousState => !previousState);
    await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .set(
      {
        userPreferences: {
          language: i18n.language === 'en' ? 'ar' : 'en'
        },
      },
      {merge: true},
    );
    // RNRestart.restart();
    // persist and reload app
  };

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  

  useEffect(() => {
    (async () => {
      const userData = auth().currentUser?.uid
      setIsEnabled(theme === 'dark' ? true : false)
      setIsEnabled2(i18n.language === 'ar' ? true : false)
      console.log('user data in profile: ', userData)
      setUser(userData);
    })()
  }, [])

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AppText>user Id: {user}</AppText>
      <View style={{flexDirection: 'row'}}>
        <AppText>Dark Mode: </AppText>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAppTheme}
          value={isEnabled}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <AppText>Language: </AppText>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAppLanguage}
          value={isEnabled2}
        />
      </View>
      <AppText>Created at: {auth().currentUser?.metadata.creationTime?.split('T')[0]}</AppText>
      <AppButton onPress={handleSignOut} flat>Sign out</AppButton>
    </View>
  );
}

export default ProfileScreen;
