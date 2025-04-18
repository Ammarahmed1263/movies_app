import Image from '@atoms/AppImage';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {hs, ms, vs, width} from '@styles/metrics';
import {getImageUrl} from '@utils';
import {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CastMember} from 'types/castTypes';
import {CastMemberDetailsNavigationProp} from 'types/mainStackTypes';

interface MemberProps {
  details: CastMember;
}

const Member: FC<MemberProps> = ({details}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<CastMemberDetailsNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.push('CastMemberDetails', {id: details.id})}
      style={[styles.TouchableOpacityContainer]}>
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
    flexGrow: 0,
    flexShrink: 1,
    alignSelf: 'center',
    width: width / 4,
    height: '100%',
  },
  imageContainer: {
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
  },
});
