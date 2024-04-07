import { createContext, useContext, useState, useLayoutEffect } from "react";
import { useColorScheme } from "react-native";
import FONTS from "../../styles/Fonts";
import COLORS from "../../styles/Colors";

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  color: {
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

function ContextProvider({ children }) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme || 'light');

  useLayoutEffect(() => {
    if (colorScheme === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [colorScheme]);
  
  const toggleTheme = () => {
    setTheme((prevState) => prevState === 'dark' ? 'light' : 'dark');
  }

  const colors = COLORS[theme];
  console.log(colors);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors, fonts: FONTS }} >
      {children}
    </ThemeContext.Provider>
  )
};

export const useTheme = () => useContext(ThemeContext);

export default ContextProvider;