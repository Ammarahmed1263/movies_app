import { useEffect, useState } from 'react';
import {StatusBar} from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import { useTheme } from '@contexts/ThemeContext';

import AuthStack from './AuthStack';
import MainStack from './MainStack';


export default function AppNavigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  console.log('active user data: ', user)
  const { colors, fonts } = useTheme();
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.primary500} />
        {user ? <MainStack colors={colors} fonts={fonts}/> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}