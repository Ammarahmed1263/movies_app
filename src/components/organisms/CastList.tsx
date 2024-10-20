import { FC } from "react";
import { FlatList, View } from "react-native";
import Member from "@molecules/CastMember";
import { CastMember, CastMemberArray } from "types/castTypes";
import AppText from "@atoms/AppText";
import { useTheme } from "@contexts/ThemeContext";
import AppLoading from "@atoms/AppLoading";
import { vs } from "@styles/metrics";


const renderItem = ({ item }: { item: CastMember }) => {
  return <Member details={item} />
}

interface CastListProps {
  cast: CastMemberArray
  title: string
}

const CastList: FC<CastListProps> = ({ cast, title }) => {
  const { colors } = useTheme();

  return (
    <View>
      <AppText
        variant="heading"
        style={{
          color: colors.paleShade,
          marginHorizontal: 10,
        }}>
        {title}
      </AppText>
      <FlatList
        data={cast}
        renderItem={renderItem}
        ListEmptyComponent={
          cast.length > 0 ?
            <View style={{ flex: 1, alignItems: 'center' }}>
              <AppLoading source={require('../../assets/lottie/loading_fade.json')} />
            </View>
            :
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: vs(20)}}>
              <AppText variant="body" style={{ color: colors.paleShade}}>No Cast Available</AppText>
            </View>
        }
        contentContainerStyle={{ paddingHorizontal: 10, flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
}

export default CastList;
