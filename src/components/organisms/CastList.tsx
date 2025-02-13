import {FC} from 'react';
import {FlatList, View} from 'react-native';
import Member from '@molecules/CastMember';
import {CastMember, CastMemberArray} from 'types/castTypes';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import AppLoading from '@atoms/AppLoading';
import {hs, vs, width} from '@styles/metrics';

const renderItem = ({item}: {item: CastMember}) => {
  return <Member details={item} />;
};

interface CastListProps {
  cast: CastMemberArray;
  title: string;
}

const CastList: FC<CastListProps> = ({cast, title, ...props}) => {
  const {colors} = useTheme();

  return (
    <View>
      <AppText
        variant="heading"
        style={{
          color: colors.paleShade,
          marginHorizontal: hs(12),
        }}>
        {title}
      </AppText>
      <FlatList
        data={cast}
        renderItem={renderItem}
        ListEmptyComponent={
          cast.length > 0 ? (
            <AppLoading
              source={require('../../assets/lottie/loading_fade.json')}
            />
          ) : (
            <View
              style={{
                flex: 1,
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: vs(20),
              }}>
              <AppText variant="body" style={{color: colors.paleShade}}>
                No Cast Available
              </AppText>
            </View>
          )
        }
        contentContainerStyle={{paddingHorizontal: hs(10), flexGrow: 1}}
        style={{
          flexGrow: 0,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        {...props}
      />
    </View>
  );
};

export default CastList;
