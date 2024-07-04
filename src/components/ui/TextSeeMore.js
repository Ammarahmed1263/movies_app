import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import COLORS from '../../styles/Colors';
import { useTheme } from '../../store/context/ThemeContext';

export default function TextSeeMore({text, maxChars, style}) {
  const [fullShown, setFullShown] = useState(false);
  const { colors } = useTheme();

  const toggleShowFull = () => {
    setFullShown(prev => !prev);
  };

  return (
    <Text style={style}>
      {text.length < maxChars ? (
        text
      ) : (
        <>
          {fullShown ? text : text.slice(0, maxChars) + '...'}
          <Text
            onPress={toggleShowFull}
            style={{
              fontSize: 15,
              color: colors.links,
              textDecorationLine: 'underline',
            }}
          >
            {fullShown ? ' See Less' : ' See More'}
          </Text>
        </>
      )}
    </Text>
  );
}
