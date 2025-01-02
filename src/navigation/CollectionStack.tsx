import { useTheme } from '@contexts/ThemeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CollectionDetailsScreen,
  CollectionListingScreen,
  CreateCollectionScreen
} from '@screens';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CollectionStackParamList } from 'types/CollectionStackTypes';
import { CollectionStackProps } from 'types/mainStackTypes';

const Stack = createNativeStackNavigator<CollectionStackParamList>();

const CollectionStack: FC<CollectionStackProps> = () => {
  const {t} = useTranslation();
  const { colors, fonts } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="CreateCollection"
        component={CreateCollectionScreen}
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
        name="ListCollections"
        component={CollectionListingScreen}
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
        name="CollectionDetails"
        component={CollectionDetailsScreen}
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

export default CollectionStack;
