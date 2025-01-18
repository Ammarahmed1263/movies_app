import { FC, useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { ListDetailsScreenScreenProps } from "types/listsStackTypes";

const ListDetailsScreenScreen: FC<ListDetailsScreenScreenProps> = ({ route, navigation }) => {
  const { listTitle } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: listTitle,
    });
  }, [navigation]);

  return (
    <View>
      <Text>ListDetailsScreenScreen</Text>
    </View>
  )
}

export default ListDetailsScreenScreen;