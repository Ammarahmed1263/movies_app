import { FC } from "react";
import { FlatList, View } from "react-native";
import Member from "@molecules/CastMember";
import { CastMember, CastMemberArray } from "types/castTypes";


const renderItem = ({item}: {item: CastMember}) => {
  return <Member details={item} />
}

interface CastListProps {
  cast: CastMemberArray
}

const CastList: FC<CastListProps> = ({cast}) => {
  return (
      <FlatList
        data={cast}
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: 10, flexGrow: 1}}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
  );
}

export default CastList;
