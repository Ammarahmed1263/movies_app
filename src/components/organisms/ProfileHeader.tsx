import {FC, useState} from 'react';
import {View} from 'react-native';
import AppText from '@atoms/AppText';
import {vs, width} from '@styles/metrics';
import auth from '@react-native-firebase/auth';
import i18n from 'i18n';
import {useTheme} from '@contexts/ThemeContext';
import {useTranslation} from 'react-i18next';
import ImagePicker from '@molecules/ImagePicker';

const ProfileHeader: FC = () => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  );

  const saveProfilePicture = async (uri: string | undefined) => {
    setProfileImage(uri);
    try {
      await auth().currentUser?.updateProfile({
        photoURL: uri,
      });
    } catch (err) {
      console.error('error saving picture: ', err);
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
      <ImagePicker
        selectedImage={auth().currentUser?.photoURL ?? profileImage}
        onImageSelected={uri => saveProfilePicture(uri)}
      />
      <AppText variant="heading">
        {auth().currentUser?.displayName ??
          auth().currentUser?.email?.split('@')[0]}
      </AppText>
      <AppText variant="body" style={{color: colors.primary700}}>
        {t('joined')}:{' '}
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
