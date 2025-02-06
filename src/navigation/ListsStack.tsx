import AppButton from '@atoms/AppButton';
import {useTheme} from '@contexts/ThemeContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ListDetailsScreenScreen, ListsListingScreen} from '@screens';
import {ms} from '@styles/metrics';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListstackParamList} from 'types/listsStackTypes';
import {ListstackProps} from 'types/mainStackTypes';

const Stack = createNativeStackNavigator<ListstackParamList>();

const Liststack: FC<ListstackProps> = ({navigation}) => {
  const {colors, fonts} = useTheme();
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
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
      <Stack.Screen
        name="ListsFlatlist"
        component={ListsListingScreen}
        options={{
          title: t('my_lists'),
          headerTintColor: colors.paleShade,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: fonts.regular.fontFamily},
        }}
      />

      <Stack.Screen
        name="ListDetailsScreen"
        component={ListDetailsScreenScreen}
        options={{
          title: 'List Details',
          headerTintColor: colors.paleShade,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: fonts.regular.fontFamily},
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

export default Liststack;
