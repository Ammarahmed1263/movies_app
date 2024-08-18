import { createContext, useContext, useState, useLayoutEffect, ReactNode, FC } from "react";
import { useColorScheme } from "react-native";
import FONTS from "../styles/Fonts";
import COLORS from "../styles/Colors";
import { ThemeContextType } from "../types/themeTypes";

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  colors: {
    primary500: '',
    primary600: '',
    primary700: '',
    secondary500: '',
    secondary600: '',
    paleShade: '',
  },
  fonts: {  
    bold: '',
    regular: '',
    light: ''
  },
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