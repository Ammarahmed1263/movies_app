import {useTheme} from '@contexts/ThemeContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateUserListScreen,
  UserListDetailsScreen,
  UserListsListingScreen,
} from '@screens';
import {FC} from 'react';
import {Button, Touchable} from 'react-native';
import {UserListStackProps} from 'types/mainStackTypes';
import {UserListStackParamList} from 'types/userListsStackTypes';

const Stack = createNativeStackNavigator<UserListStackParamList>();

const UserListStack: FC<UserListStackProps> = ({navigation}) => {
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
        component={CreateUserListScreen}
        options={{
          title: 'Add New List',
          headerTintColor: colors.paleShade,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: fonts.regular.fontFamily},
        }}
      />

      <Stack.Screen
        name="ListUserLists"
        component={UserListsListingScreen}
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

export default UserListStack;
