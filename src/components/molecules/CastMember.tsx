import {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Image from '@atoms/AppImage';
import {useTheme} from '@contexts/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {getImageUrl} from '@utils';
import {CastMember} from 'types/castTypes';
import {CastMemberDetailsNavigationProp} from 'types/mainStackTypes';
import AppText from '@atoms/AppText';
import {hs, ms, vs} from '@styles/metrics';

interface MemberProps {
  details: CastMember;
}

const Member: FC<MemberProps> = ({details}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<CastMemberDetailsNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.push('CastMemberDetails', {id: details.id})}
      style={styles.TouchableOpacityContainer}>
      <View
        style={{...styles.imageContainer, borderColor: colors.secondary500}}>
        <Image
          source={getImageUrl(details.profile_path)}
          placeholder="person"
          viewStyle={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={{...styles.details, borderColor: colors.secondary600}}>
        <AppText
          variant="bold"
          numberOfLines={1}
          style={{
            width: '80%',
            fontSize: ms(16),
            color: colors.paleShade,
          }}>
          {details.name.length >= 14
            ? details.name.split(' ')[0]
            : details.name}
        </AppText>
        {details.character && (
          <AppText
            variant="caption"
            numberOfLines={1}
            style={{
              color: colors.paleShade,
            }}>
            {details.character.length >= 15
              ? details.character.split(' ')[0]
              : details.character}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Member;

const styles = StyleSheet.create({
  TouchableOpacityContainer: {
    flex: 1,
    flexGrow: 0,
    flexShrink: 1,
    alignSelf: 'flex-start',
    width: hs(100),
    marginVertical: vs(10),
  },
  imageContainer: {
    width: hs(90),
    aspectRatio: 1 / 1,
    borderWidth: ms(1),
    borderRadius: ms(12),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    width: '90%',
    alignItems: 'center',
    marginVertical: vs(10),
    // paddingHorizontal: 10,
  },
});
