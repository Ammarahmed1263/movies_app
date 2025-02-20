import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import {
  MovieDetailsScreen,
  MovieListingScreen,
  CastMemberScreen,
} from '@screens';
import {ColorsType, FontsType} from 'types/themeTypes';
import {FC, useEffect} from 'react';
import {MainStackParamList} from 'types/mainStackTypes';
import {useTranslation} from 'react-i18next';
import Liststack from './ListsStack';
import AppButton from '@atoms/AppButton';
import {ms} from '@styles/metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {I18nManager} from 'react-native';
import {getUserProfile} from '@services/userService';
import i18n from 'i18n';

const Stack = createNativeStackNavigator<MainStackParamList>();

interface MainStackProps {
  colors: ColorsType;
  fonts: FontsType;
}

const MainStack: FC<MainStackProps> = ({colors, fonts}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  useEffect(() => {
    (async () => {
      const user = await getUserProfile();

      if (user?.userPreferences?.language) {
        i18n.changeLanguage(user.userPreferences.language);
      }
    })();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerLeft: ({canGoBack}) =>
          canGoBack ? (
            <AppButton onPress={() => navigation.goBack()} flat>
              <Icon
                name={I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
                size={ms(23)}
                color={colors.paleShade}
              />
            </AppButton>
          ) : null,
      }}>
      <Stack.Screen name="BottomTabs" component={MainTabs} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="CastMemberDetails" component={CastMemberScreen} />
      <Stack.Screen
        name="Liststack"
        component={Liststack}
        options={{
          animation: 'slide_from_bottom',
        }}
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
