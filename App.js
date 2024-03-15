import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import AuthStack from './src/navigation/AuthStack';
import BottomTabs from './src/navigation/BottomTabs';
import GlobalStyles from './src/utils/GlobalStyles';


export default function App() {
  const authorized = true;

  return (
    <>
      <StatusBar backgroundColor={GlobalStyles.primary500} />
      <NavigationContainer>
        {authorized ? <BottomTabs /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}
