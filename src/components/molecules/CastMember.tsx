import { FC } from 'react';
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
import {ms} from '@styles/metrics';

interface MemberProps {
  details: CastMember;
}

const Member: FC<MemberProps> = ({details}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<CastMemberDetailsNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CastMemberDetails', {id: details.id})}
      style={styles.TouchableOpacityContainer}>
      <View
        style={{...styles.imageContainer, borderColor: colors.secondary500}}>
        <Image
          source={getImageUrl(details.profile_path)}
          placeholder="person"
          viewStyle={styles.image}
          resizeMode="stretch"
        />
      </View>
      <View style={{...styles.details, borderColor: colors.secondary600}}>
        <AppText
          variant="bold"
          numberOfLines={1}
          style={{
            fontSize: ms(16),
            color: colors.paleShade,
          }}>
          {details.original_name.length >= 14
            ? details.original_name.split(' ')[0]
            : details.original_name}
        </AppText>
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
      </View>
    </TouchableOpacity>
  );
};

export default Member;

const styles = StyleSheet.create({
  TouchableOpacityContainer: {
    alignItems: 'center',
    marginVertical: 10,
    width: 120,
  },
  imageContainer: {
    width: 90,
    aspectRatio: 1 / 1,
    borderWidth: 2,
    borderRadius: 45,
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
    alignItems: 'center',
    // paddingHorizontal: 10,
    marginVertical: 10,
    width: '90%',
  },
});
