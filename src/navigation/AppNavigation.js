import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';
import { useTheme } from '../store/context/ThemeContext';

export default function AppNavigation() {
  const authorized = true;
  const { colors } = useTheme();

  return (
    <>
      <StatusBar backgroundColor={colors.primary500} />
      <NavigationContainer>
        {authorized ? <BottomTabs /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}