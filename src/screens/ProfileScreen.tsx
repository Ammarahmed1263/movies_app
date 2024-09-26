import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import i18n from '../i18n';
import {useEffect, useState} from 'react';
import {Switch, View} from 'react-native';
import auth, { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNRestart from 'react-native-restart';
import AppButton from '@atoms/AppButton';

function ProfileScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const {toggleTheme, theme} = useTheme();
  console.log('theme now: ', theme, user);
  console.log(i18n.language);
  const toggleAppTheme = () => {
    toggleTheme();
    setIsEnabled(previousState => !previousState);
    RNRestart.restart();
    // persist and reload app
  };

  const toggleAppLanguage = () => {
    i18n.language === 'en'
      ? i18n.changeLanguage('ar')
      : i18n.changeLanguage('en');

    setIsEnabled2(previousState => !previousState);
    RNRestart.restart();
    // persist and reload app
  };

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  useEffect(() => {
    (async () => {
      const userData = await firestore().collection('users').doc(auth().currentUser?.uid).get()
      console.log('user data in profile: ', userData.data()?.name)
      setUser(userData.data()?.name);
    })()
  }, [user])

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AppText>username: {user}</AppText>
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
