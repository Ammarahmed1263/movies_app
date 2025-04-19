'use client';

import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  type TextInputProps,
  I18nManager,
  type ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Ionicons = Icon as any;
import Voice, {
  type SpeechEndEvent,
  type SpeechErrorEvent,
  type SpeechResultsEvent,
  type SpeechStartEvent,
} from '@react-native-voice/voice';
import {useTheme} from '@contexts/ThemeContext';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import {hs, ms, vs} from '@styles/metrics';
import {useAppSelector} from '@hooks/useRedux';

interface SearchBarProps extends TextInputProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  mic?: boolean;
  viewStyle?: ViewStyle;
}

const SearchBar: FC<SearchBarProps> = ({
  setKeyword,
  keyword,
  mic = true,
  viewStyle,
  ...props
}) => {
  const [recording, setRecording] = useState(false);
  const {colors, fonts} = useTheme();
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const {language} = useAppSelector(state => state.user.preferences);

  useFocusEffect(() => {
    if (inputRef.current && !keyword) {
      inputRef.current?.focus();
    }
  });

  useEffect(() => {
    (async () => {
      try {
        await Voice.destroy();
        setupVoiceListeners();
      } catch (e) {
        console.error('Failed to initialize Voice', e);
      }
    })();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const setupVoiceListeners = () => {
    Voice.onSpeechStart = (e: SpeechStartEvent) => {
      setRecording(true);
      console.log('onSpeechStart:', e);
    };

    Voice.onSpeechEnd = (e: SpeechEndEvent) => {
      setRecording(false);
      console.log('onSpeechEnd:', e);
    };

    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      setRecording(false);
      console.log('onSpeechError:', e);
      Voice.destroy().catch(console.error);
    };

    Voice.onSpeechResults = async (e: SpeechResultsEvent) => {
      console.log('onSpeechResult:', e);
      setKeyword(e?.value?.[0] ?? '');
      setRecording(false);

      try {
        await Voice.destroy();
        setupVoiceListeners();
      } catch (err) {
        console.error('Error resetting Voice after results', err);
      }
    };
  };

  const _startRecognizing = async () => {
    try {
      await Voice.destroy();
      setupVoiceListeners();

      await Voice.start(language === 'ar' ? 'ar-EG' : 'en-US');
    } catch (e) {
      console.error('Error starting voice recognition', e);
      setRecording(false);
    }
  };

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
      await Voice.destroy();
      setupVoiceListeners();
      setRecording(false);
    } catch (e) {
      console.error('Error canceling voice recognition', e);
      setRecording(false);
    }
  };

  async function handleMicPress() {
    try {
      if (!recording) {
        await _startRecognizing();
      } else {
        await _cancelRecognizing();
      }
    } catch (e) {
      console.log(e);
      setRecording(false);
    }
  }

  return (
    <View
      style={[
        styles.searchBar,
        {borderColor: colors.secondary600, backgroundColor: colors.primary500},
        viewStyle,
      ]}>
      <TextInput
        ref={inputRef}
        placeholder={t('search movies')}
        placeholderTextColor={colors.primary700}
        cursorColor={colors.secondaryShadow}
        value={keyword}
        onChangeText={text => setKeyword(text)}
        style={{
          ...styles.input,
          color: colors.primary700,
          fontFamily: fonts.regular.fontFamily,
        }}
        {...props}
      />
      {mic && (
        <TouchableOpacity
          style={[
            styles.iconContainer,
            !recording && {
              borderRadius: 0,
              borderStartWidth: 1,
              borderColor: colors.primary700,
            },
            recording && {backgroundColor: colors.success},
          ]}
          onPress={handleMicPress}>
          <Ionicons
            name={recording ? 'mic-off' : 'mic-outline'}
            size={30}
            color={recording ? colors.paleShade : colors.secondary500}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1.6,
    borderBottomWidth: 1.6,
    borderWidth: 0.9,
    borderRadius: ms(12),
    marginHorizontal: 15,
    minHeight: vs(45),
  },
  input: {
    flex: 8,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingStart: hs(15),
  },
  iconContainer: {
    flex: 1,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hs(10),
    padding: hs(4),
  },
});
