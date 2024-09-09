import { useEffect, useState } from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-voice/voice';
import {useTheme} from '@contexts/ThemeContext';

function SearchBar({setKeyword, keyword}) {
  const { colors, fonts } = useTheme();

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler
    Voice.onSpeechEnd = onSpeechEndHandler
    Voice.onSpeechResults = onSpeechResultsHandler

    function onSpeechStartHandler(e) {
          console.log('onSpeechStart: ', e)
    }
    
    function onSpeechEndHandler(e) {
      console.log('onSpeechEnd: ', e)      
    }
    
    function onSpeechResultsHandler(e) {
      setKeyword(e.value[0])
      console.log('onSpeechResult: ', e)      
    }
    
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [])

  async function onStartButtonPress() {
    try {
      const active = await Voice.isRecognizing();
      if(!active) {
        console.log('recording')
        await Voice.start('ar-EG') // TODO: change based on app locale
      } else {
        console.log('stop recording')
        await Voice.stop();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View
      style={{
        ...styles.searchBar,
        borderColor: colors.secondary600,
        backgroundColor: colors.primary500,
      }}>
      <TextInput
        placeholder="Search Movies"
        placeholderTextColor={colors.primary700}
        cursorColor={colors.primary700}
        value={keyword}
        onChangeText={text => setKeyword(text)}
        style={{...styles.input, color: colors.primary700, fontFamily:  fonts.regular}}
      />
      <TouchableOpacity style={styles.iconContainer} onPress={onStartButtonPress}>
        <Icon name="mic" size={30} color={colors.secondary500} />
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1.6,
    borderBottomWidth: 1.6,
    borderWidth: 0.9,
    marginTop: 20,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  input: {
    flex: 8,
    fontSize: 13,
    paddingHorizontal: 15,
  },
  iconContainer: {
    flex: 1,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(106, 106, 106, 0.54)',
    borderRadius: 30,
    padding: 7,
    paddingLeft: 10,
  },
});
