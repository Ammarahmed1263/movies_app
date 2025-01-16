import { FC, useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { UserListDetailsScreenProps } from "types/userListsStackTypes";

const UserListDetailsScreen: FC<UserListDetailsScreenProps> = ({ route, navigation }) => {
  const { listTitle } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: listTitle,
    });
  }, [navigation]);

  return (
    <View>
      <Text>UserListDetailsScreen</Text>
    </View>
  )
}

export default UserListDetailsScreen;