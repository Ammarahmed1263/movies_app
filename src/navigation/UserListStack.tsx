import { useTheme } from '@contexts/ThemeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CreateUserListScreen,
  UserListDetailsScreen,
  UserListsListingScreen
} from '@screens';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { UserListStackParamList } from 'types/userListsStackTypes';
import { UserListStackProps } from 'types/mainStackTypes';

const Stack = createNativeStackNavigator<UserListStackParamList>();

const UserListStack: FC<UserListStackProps> = () => {
  const {t} = useTranslation();
  const { colors, fonts } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="CreateUserList"
        component={CreateUserListScreen}
        options={{
          headerShown: true,
          title: 'Add New Collection',
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
          headerShown: true,
          title: 'My Collections',
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
          headerShown: true,
          title: 'Collection Details',
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
