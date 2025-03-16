import AppButton from '@atoms/AppButton';
import AppModal from '@atoms/AppModal';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import useOrientation from '@hooks/useOrientation';
import {hs, vs} from '@styles/metrics';
import {createYouTubePlaylistUrl} from '@utils';
import {FC, useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Linking, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import YoutubeIframe, {getYoutubeMeta} from 'react-native-youtube-iframe';
import {Trailer} from 'types/movieTypes';

interface YotubeModalProps {
  videos: Trailer[];
  visible: boolean;
  handleClose: () => void;
}

const YoutubeModal: FC<YotubeModalProps> = ({videos, visible, handleClose}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [videoMeta, setVideoMeta] = useState<{
    title: string | null;
    author: string | null;
  }>({title: null, author: null});
  const {width, height, orientation, isPortrait} = useOrientation();

  useEffect(() => {
    (async () => {
      if (videos.length > 0) {
        try {
          const response = await getYoutubeMeta(videos[0]?.key);
          setVideoMeta({title: response.title, author: response.author_name});
        } catch (e) {
          console.log('unable to get video meta data: ', e);
        }
      }
    })();
  }, [videos, visible]);

  const handleYoutubeRedirect = useCallback(async () => {
    try {
      await Linking.openURL(createYouTubePlaylistUrl(videos));
      handleClose();
    } catch (e: any) {
      Alert.alert('error redirecting:', e.request.data);
    }
  }, [videos]);

  return (
    <AppModal
      visible={visible}
      handleClose={handleClose}
      viewStyle={{gap: vs(10)}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          // height: vs(40),
        }}>
        <AppButton
          pressableStyle={{flex: 0}}
          flat
          customView
          onPress={handleClose}>
          <Icon name="close-circle" size={33} color={colors.primary700} />
        </AppButton>
      </View>
      {videos.length > 0 ? (
        <View style={{gap: vs(15)}}>
          <View
            style={{
              flexDirection: isPortrait ? 'column' : 'row',
            }}>
            <View style={{borderRadius: 20, overflow: 'hidden'}}>
              <YoutubeIframe
                height={
                  isPortrait
                    ? (width * 0.9 - 40) * (9 / 16)
                    : (width / 2.5) * (9 / 16)
                }
                width={isPortrait ? width * 0.9 - 40 : width / 2.3}
                playList={videos.map(video => video.key)}
                play={visible}
              />
            </View>
            <View
              style={{
                maxWidth: isPortrait ? width : width / 3,
                paddingHorizontal: isPortrait ? hs(5) : hs(10),
                paddingTop: isPortrait ? vs(10) : vs(8),
              }}>
              <AppText
                variant="bold"
                style={{
                  color: colors.paleShade,
                }}>
                {videoMeta.title}
              </AppText>
              <AppText
                variant="light"
                style={{
                  color: colors.primary700,
                }}>
                By: {videoMeta.author}
              </AppText>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <AppButton
              customView
              customViewStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleYoutubeRedirect}>
              <Icon name="play" size={24} color={colors.paleShade} />
              <AppText
                variant="bold"
                style={{
                  color: colors.paleShade,
                  marginTop: 2,
                }}>
                {t('watch_youtube')}
              </AppText>
            </AppButton>
          </View>
        </View>
      ) : (
        <View
          style={{
            height: height * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText variant="heading" style={{textAlign: 'center'}}>
            {t('no_trailer')}
          </AppText>
        </View>
      )}
    </AppModal>
  );
};

export default YoutubeModal;
