import AppButton from '@atoms/AppButton';
import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  CastMemberScreen,
  MovieDetailsScreen,
  MovieListingScreen,
} from '@screens';
import {ms} from '@styles/metrics';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Ionicons = Icon as any;
import {MainStackParamList} from 'types/mainStackTypes';
import {ColorsType, FontsType} from 'types/themeTypes';
import Liststack from './ListsStack';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator<MainStackParamList>();

interface MainStackProps {
  colors: ColorsType;
  fonts: FontsType;
}

const MainStack: FC<MainStackProps> = ({colors, fonts}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  // useEffect(() => {
  //   (async () => {
  //     const user = await getUserProfile();

  //     if (user?.userPreferences?.language) {
  //       i18n.changeLanguage(user.userPreferences.language);
  //     }
  //   })();
  // }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerLeft: ({canGoBack}) =>
          canGoBack ? (
            <AppButton onPress={() => navigation.goBack()} flat>
              <Ionicons
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
