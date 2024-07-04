import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CastMemberScreen from '../screens/CastMemberScreen';
import MovieDetails from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const MovieStack = ({route}) => {
  const {colors} = route.params;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.primary500},
      }}>
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="CastMember" component={CastMemberScreen} />
    </Stack.Navigator>
  );
};

export default MovieStack;
