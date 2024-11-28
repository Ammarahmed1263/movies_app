import {FC} from 'react';
import {View} from 'react-native';
import AppText from '@atoms/AppText';
import {vs, width} from '@styles/metrics';
import auth from '@react-native-firebase/auth';
import i18n from 'i18n';
import {useTheme} from '@contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const ProfileHeader: FC = () => {
  const {colors} = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{alignItems: 'center', paddingTop: vs(20)}}>
      <View
        style={{
          borderRadius: width / 6,
          width: width / 3,
          height: width / 3,
          backgroundColor: 'grey',
        }}
      />
      <AppText variant="heading">{auth().currentUser?.email}</AppText>
      <AppText variant="body" style={{color: colors.primary700}}>
        {t("joined")}:{' '}
        {new Date(
          auth().currentUser?.metadata.creationTime ?? '',
        ).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', {
          year: 'numeric',
          month: 'long',
        })}
      </AppText>
    </View>
  );
};

export default ProfileHeader;
