import AppButton from '@atoms/AppButton';
import {useTheme} from '@contexts/ThemeContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ListDetailsScreenScreen, ListsListingScreen} from '@screens';
import {ms} from '@styles/metrics';
import {FC} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListstackParamList} from 'types/listsStackTypes';
import {ListstackProps} from 'types/mainStackTypes';

const Stack = createNativeStackNavigator<ListstackParamList>();

const Liststack: FC<ListstackProps> = ({navigation}) => {
  const {colors, fonts} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerLeft: ({canGoBack}) =>
          canGoBack ? (
            <AppButton onPress={() => navigation.goBack()} flat>
              <Icon
                name="chevron-back"
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
          title: 'My Lists',
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
        }}
      />
    </Stack.Navigator>
  );
};

export default Liststack;
