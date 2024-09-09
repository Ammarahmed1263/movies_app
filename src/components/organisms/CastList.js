import { FlatList, View } from "react-native";
import Member from "@molecules/CastMember";


const renderItem = ({item}) => {
  return <Member details={item} />
}

function CastList({cast}) {
  return (
      <FlatList
        data={cast}
        renderItem={renderItem}
        keyExtractor={member => member.id}
        contentContainerStyle={{paddingHorizontal: 10, flexGrow: 1}}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
  );
}

export default CastList;
