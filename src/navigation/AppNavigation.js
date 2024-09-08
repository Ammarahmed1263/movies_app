import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

import AuthStack from './AuthStack';
import MainStack from './MainStack';


export default function AppNavigation() {
  const authorized = true;
  const { colors, fonts } = useTheme();

  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.primary500} />
        {authorized ? <MainStack colors={colors} fonts={fonts}/> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}