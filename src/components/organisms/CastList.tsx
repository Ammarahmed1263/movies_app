import {FC} from 'react';
import {FlatList, FlatListProps, View, ViewStyle} from 'react-native';
import Member from '@molecules/CastMember';
import {CastMember, CastMemberArray} from 'types/castTypes';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import AppLoading from '@atoms/AppLoading';
import {hs, vs, width} from '@styles/metrics';
import {useTranslation} from 'react-i18next';

const renderItem = ({item}: {item: CastMember}) => {
  return <Member details={item} />;
};

interface CastListProps
  extends Omit<FlatListProps<CastMember>, 'data' | 'renderItem'> {
  title: string;
  loading: boolean;
  cast: CastMemberArray;
  viewStyle?: ViewStyle;
}

const CastList: FC<CastListProps> = ({
  cast,
  loading,
  viewStyle,
  title,
  ...props
}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View style={viewStyle}>
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
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          loading ? (
            <AppLoading
              source={require('../../assets/lottie/loading_fade.json')}
              containerStyle={{height: vs(80)}}
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
                {t('empty_cast')}
              </AppText>
            </View>
          )
        }
        contentContainerStyle={{
          paddingHorizontal: hs(10),
          gap: hs(10),
          flexGrow: 1,
        }}
        style={{
          flexGrow: 0,
          marginTop: vs(10),
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        {...props}
      />
    </View>
  );
};

export default CastList;
