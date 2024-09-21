import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { MovieDetailsScreen, MovieListingScreen, CastMemberScreen } from '@screens/index';
import { ColorsType, FontsType } from 'types/themeTypes';
import { FC } from 'react';
import { MainStackParamList } from 'types/mainStackTypes';

const Stack = createNativeStackNavigator<MainStackParamList>();

interface MainStackProps {
  colors: ColorsType
  fonts: FontsType
}

const MainStack: FC<MainStackProps> = ({colors, fonts}) => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.primary500},
      }}>
      <Stack.Screen
        name="BottomTabs"
        component={MainTabs}
        initialParams={{colors, fonts}}
      />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="CastMemberDetails" component={CastMemberScreen} />
      <Stack.Screen
        name="MovieListing"
        component={MovieListingScreen}
        initialParams={{colors}}
        options={{
          headerShown: true,
          title: 'All Movies',
          headerStyle: {backgroundColor: colors.primary500},
          headerTintColor: colors.paleShade,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: fonts.regular.fontFamily}
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
