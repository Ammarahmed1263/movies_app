import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from 'react';
import {useColorScheme} from 'react-native';
import COLORS from '@styles/Colors';
import getFonts from '@styles/Fonts';
import {ThemeContextType} from 'types/themeTypes';
import {getUserProfile} from '@services/userService';

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  colors: {
    primary500: '',
    primary600: '',
    primary700: '',
    secondary500: '',
    secondary600: '',
    secondaryShadow: '',
    paleShade: '',
    link: '',
    error: '',
    success: '',
    transparent: '',
  },
  fonts: {
    light: {
      fontFamily: '',
      fontSize: 14,
      fontWeight: undefined,
    },
    regular: {
      fontFamily: '',
      fontSize: 16,
      fontWeight: undefined,
    },
    bold: {
      fontFamily: '',
      fontSize: 18,
      fontWeight: undefined,
    },
    heading: {
      fontFamily: '',
      fontSize: 24,
      fontWeight: undefined,
    },
    subheading: {
      fontFamily: '',
      fontSize: 20,
      fontWeight: undefined,
    },
    body: {
      fontFamily: '',
      fontSize: 16,
      fontWeight: undefined,
    },
    caption: {
      fontFamily: '',
      fontSize: 12,
      fontWeight: undefined,
    },
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({children}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<'dark' | 'light'>(colorScheme || 'light');

  useEffect(() => {
    (async () => {
      setTheme(colorScheme || 'light');
    })();
  }, [colorScheme]);

  useEffect(() => {
    (async () => {
      const user = await getUserProfile();
      if (user && user.userPreferences?.theme) {
        setTheme(user.userPreferences.theme);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const colors = COLORS[theme];
  const fonts = getFonts();

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, colors, fonts}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
