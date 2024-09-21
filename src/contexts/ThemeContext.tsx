import { createContext, useContext, useState, useLayoutEffect, ReactNode, FC } from "react";
import { useColorScheme } from "react-native";
import FONTS from "@styles/Fonts";
import COLORS from "@styles/Colors";
import { ThemeContextType } from "types/themeTypes";

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
    links: ''
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

  }
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<'dark' | 'light'>(colorScheme || 'light');

  useLayoutEffect(() => {
    setTheme(colorScheme === 'dark' ? 'dark' : 'light')
  }, [colorScheme]);
  
  const toggleTheme = () => {
    setTheme((prevState) => prevState === 'dark' ? 'light' : 'dark');
  }

  const colors = COLORS[theme];

  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors, fonts: FONTS }} >
      {children}
    </ThemeContext.Provider>
  )
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;