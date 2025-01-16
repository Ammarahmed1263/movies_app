import {useTheme} from '@contexts/ThemeContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateListscreen,
  UserListDetailsScreen,
  ListsListingScreen,
} from '@screens';
import {FC} from 'react';
import {Button, Touchable} from 'react-native';
import {ListstackProps} from 'types/mainStackTypes';
import {ListstackParamList} from 'types/listsStackTypes';

const Stack = createNativeStackNavigator<ListstackParamList>();

const Liststack: FC<ListstackProps> = ({navigation}) => {
  const {colors, fonts} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: ({canGoBack}) =>
          canGoBack ? (
            <Button title="Back" onPress={() => navigation.goBack()} />
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
        name="ListLists"
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
        name="UserListDetails"
        component={UserListDetailsScreen}
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
