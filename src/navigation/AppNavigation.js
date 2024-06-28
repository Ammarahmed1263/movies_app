import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { useTheme } from '../store/context/ThemeContext';

import AuthStack from './AuthStack';
import MainStack from './MainStack';


export default function AppNavigation() {
  const authorized = true;
  const { colors } = useTheme();

  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.primary500} />
        {authorized ? <MainStack colors={colors} /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}