import {useTheme} from '@contexts/ThemeContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateListscreen,
  ListDetailsScreenScreen,
  ListsListingScreen,
} from '@screens';
import {FC} from 'react';
import {Button, Touchable, TouchableOpacity} from 'react-native';
import {ListstackProps} from 'types/mainStackTypes';
import {ListstackParamList} from 'types/listsStackTypes';
import Icon from "react-native-vector-icons/Ionicons";
import { ms } from '@styles/metrics';
import AppButton from '@atoms/AppButton';


const Stack = createNativeStackNavigator<ListstackParamList>();

const Liststack: FC<ListstackProps> = ({navigation}) => {
  const {colors, fonts} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: ({canGoBack}) =>
          canGoBack ? (
            <AppButton onPress={() => navigation.goBack()} flat>
              <Icon name="chevron-back" size={ms(23)} color={colors.paleShade} />
            </AppButton>
          ) : null,
      }}>
      <Stack.Screen
        name="CreateUserList"
        component={CreateListscreen}
        options={{
          title: 'Add New List',
          headerTintColor: colors.paleShade,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: fonts.regular.fontFamily},
        }}
      />

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
