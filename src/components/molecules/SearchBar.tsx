import {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  I18nManager,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice, {
  SpeechEndEvent,
  SpeechErrorEvent,
  SpeechResultsEvent,
  SpeechStartEvent,
} from '@react-native-voice/voice';
import {useTheme} from '@contexts/ThemeContext';
import {getDeviceLanguage} from '@utils';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import {ms} from '@styles/metrics';

interface SearchBarProps extends TextInputProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  viewStyle?: ViewStyle;
}

const SearchBar: FC<SearchBarProps> = ({
  setKeyword,
  keyword,
  viewStyle,
  ...props
}) => {
  const [recording, setRecording] = useState(false);
  const {colors, fonts} = useTheme();
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(() => {
    if (inputRef.current && !keyword) {
      inputRef.current?.focus();
    }
  });

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    function onSpeechStartHandler(e: SpeechStartEvent) {
      setRecording(true);
      console.log('onSpeechStart: ', e);
    }

    function onSpeechEndHandler(e: SpeechEndEvent) {
      console.log('onSpeechEnd: ', e);
    }

    function onSpeechResultsHandler(e: SpeechResultsEvent) {
      setKeyword(e?.value?.[0] ?? '');
      setRecording(false);
      console.log('onSpeechResult: ', e);
    }

    function onSpeechErrorHandler(e: SpeechErrorEvent) {
      setRecording(false);
      console.log('onSpeechError: ', e);
    }

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  async function onStartButtonPress() {
    try {
      const active = await Voice.isRecognizing();
      if (!active) {
        console.log('recording');
        await Voice.start(getDeviceLanguage() === 'ar' ? 'ar-EG' : 'en-US');
      } else {
        console.log('stop recording');
        await Voice.stop();
      }
    } catch (e) {
      console.log(e);
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
      <TouchableOpacity
        style={[
          styles.iconContainer,
          recording && {backgroundColor: colors.link},
        ]}
        onPress={onStartButtonPress}>
        <Icon
          name={recording ? 'mic-off' : 'mic-outline'}
          size={30}
          color={recording ? colors.paleShade : colors.secondary500}
        />
      </TouchableOpacity>
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
  },
  input: {
    flex: 8,
    paddingHorizontal: 15,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  iconContainer: {
    flex: 1,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 7,
    paddingLeft: 10,
  },
});
