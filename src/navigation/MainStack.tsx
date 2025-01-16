import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import {
  MovieDetailsScreen,
  MovieListingScreen,
  CastMemberScreen,
} from '@screens';
import {ColorsType, FontsType} from 'types/themeTypes';
import {FC} from 'react';
import {MainStackParamList} from 'types/mainStackTypes';
import {useTranslation} from 'react-i18next';
import Liststack from './ListsStack';

const Stack = createNativeStackNavigator<MainStackParamList>();

interface MainStackProps {
  colors: ColorsType;
  fonts: FontsType;
}

const MainStack: FC<MainStackProps> = ({colors, fonts}) => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="BottomTabs" component={MainTabs} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="CastMemberDetails" component={CastMemberScreen} />
      <Stack.Screen
        name="Liststack"
        component={Liststack}
      />
      <Stack.Screen
        name="MovieListing"
        component={MovieListingScreen}
        options={{
          headerShown: true,
          title: t('all_movies'),
          headerTintColor: colors.paleShade,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: fonts.regular.fontFamily},
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
