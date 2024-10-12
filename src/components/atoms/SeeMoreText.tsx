import {FC} from 'react';
import {useState} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {useTheme} from '@contexts/ThemeContext';
import AppText from './AppText';
import {FontVariants} from 'types/themeTypes';

interface SeeMoreTextProps extends TextProps {
  text: string;
  maxChars?: number;
  style?: TextStyle;
  variant?: FontVariants;
}

const SeeMoreText: FC<SeeMoreTextProps> = ({
  text,
  variant = 'body',
  maxChars = 150,
  style,
  ...props
}) => {
  const [fullShown, setFullShown] = useState(false);
  const {colors} = useTheme();

  const toggleShowFull = () => {
    setFullShown(prev => !prev);
  };

  return (
    <AppText variant={variant} style={style} {...props} onPress={toggleShowFull} disabled={text.length < maxChars}>
      {text.length <= maxChars ? (
        text
      ) : (
        <>
          {fullShown ? text : text.slice(0, maxChars) + '...'}
          <AppText
            variant="light"
            style={{
              color: colors.link,
              textDecorationLine: 'underline',
            }}>
            {fullShown ? ' See Less' : ' See More'}
          </AppText>
        </>
      )}
    </AppText>
  );
};

export default SeeMoreText;
