import {useState} from 'react';
import {Text} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function TextSeeMore({text, maxChars, style}) {
  const [fullShown, setFullShown] = useState(false);
  const { colors, fonts } = useTheme();

  const toggleShowFull = () => {
    setFullShown(prev => !prev);
  };

  return (
    <Text style={[{fontFamily: fonts.regular}, style]}>
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
