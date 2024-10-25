import { FC, useCallback, useEffect, useState } from "react"
import { Alert, Linking, View } from "react-native";
import AppButton from "@atoms/AppButton";
import AppModal from "@atoms/AppModal";
import Icon from 'react-native-vector-icons/Ionicons'
import YoutubeIframe, { getYoutubeMeta } from "react-native-youtube-iframe";
import { width } from "@styles/metrics";
import AppText from "@atoms/AppText";
import { useTheme } from "@contexts/ThemeContext";
import { Trailer } from "types/movieTypes";
import { createYouTubePlaylistUrl } from "@utils";

interface YotubeModalProps {
  videos: Trailer[];
  visible: boolean;
  handleClose: () => void;
  onStateChange: (state: string) => void;
}

const YoutubeModal: FC<YotubeModalProps> = ({ videos, visible, handleClose, onStateChange }) => {
  const { colors } = useTheme();
  const [videoMeta, setVideoMeta] = useState<{
    title: string | null;
    author: string | null;
  }>({ title: null, author: null });

  useEffect(() => {
    (async () => {
      if (videos) {
        await getYoutubeMeta(videos[0]?.key).then(meta =>
          setVideoMeta({ title: meta.title, author: meta.author_name }),
        ).catch(e => console.log('unable to get video meta data: ', e));
      }
    })()
  }, [videos])

  const handleYoutubeRedirect = useCallback(async () => {
    try {
      await Linking.openURL(createYouTubePlaylistUrl(videos));
      handleClose();
    } catch (e: any) {
      Alert.alert('error redirecting:', e.request.data);
    }
  }, [videos]);


  return (
    <AppModal visible={visible} handleClose={handleClose}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <AppButton flat customView onPress={handleClose}>
          <Icon name="close-circle" size={33} color={colors.primary700} />
        </AppButton>
      </View>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: 20,
          marginVertical: 10,
        }}>
        {videos.length > 0 && 
          <YoutubeIframe
            height={(width * 0.9 - 40) * (9 / 16)}
            width={width * 0.9 - 40}
            // videoId={videos[0].key}
            playList={videos.map(video => video.key)}
            play={visible}
            onChangeState={onStateChange}
        />}
      </View>
      <View style={{ marginVertical: 5 }}>
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
      <View style={{ justifyContent: 'flex-end' }}>
        <AppButton
          customView
          customViewStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={{ marginBottom: 12 }}
          onPress={handleYoutubeRedirect}>
          <Icon name="play" size={24} color={colors.paleShade} />
          <AppText
            variant="bold"
            style={{
              color: colors.paleShade,
              marginTop: 2,
            }}>
            Open On Youtube
          </AppText>
        </AppButton>
      </View>
    </AppModal>
  )
}

export default YoutubeModal;