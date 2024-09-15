import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { MovieDetailsScreen, MoviesListingScreen, CastMemberScreen } from '@screens/index';
import { ColorsType, FontsType } from 'types/themeTypes';
import { FC } from 'react';

const Stack = createNativeStackNavigator();

interface MainStackProps {
  colors: ColorsType
  fonts: FontsType
}

const MainStack: FC<MainStackProps> = ({colors, fonts}) => {
  // TODO: initial params inconsistency
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.primary500},
      }}>
      <Stack.Screen
        name="BottomTabs"
        component={MainTabs}
        initialParams={{colors}}
      />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="CastMemberDetails" component={CastMemberScreen} />
      <Stack.Screen
        name="moviesListing"
        component={MoviesListingScreen}
        initialParams={{colors}}
        options={{
          headerShown: true,
          title: 'All Movies',
          headerStyle: {backgroundColor: colors.primary500},
          headerTintColor: colors.paleShade,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: fonts.regular}
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
