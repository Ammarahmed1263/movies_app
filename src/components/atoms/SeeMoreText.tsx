import {FC} from 'react';
import {useState} from 'react';
import {
  Platform,
  Pressable,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@contexts/ThemeContext';
import AppText from './AppText';
import {FontVariants} from 'types/themeTypes';
import {useTranslation} from 'react-i18next';
import {isIOS} from '@constants';

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
  const {t} = useTranslation();

  const toggleShowFull = () => {
    setFullShown(prev => !prev);
  };

  return (
    <Pressable onPress={toggleShowFull}>
      <AppText
        variant={variant}
        style={style}
        {...props}
        disabled={text.length < maxChars}>
        {text.length <= maxChars ? (
          text
        ) : (
          <>
            {fullShown ? text : text.slice(0, maxChars) + '...'}
            <TouchableOpacity onPress={toggleShowFull}>
              <AppText
                variant="light"
                style={{
                  color: colors.link,
                  textDecorationLine: 'underline',
                  marginBottom: isIOS ? 0 : -5,
                }}>
                {fullShown ? ' ' + t('read_less') : t('read_more')}
              </AppText>
            </TouchableOpacity>
          </>
        )}
      </AppText>
    </Pressable>
  );
};

export default SeeMoreText;
