export type ColorsType = {
  primary500: string;
  primary600: string;
  primary700: string;
  secondary500: string;
  secondary600: string;
  secondaryShadow: string;
  paleShade: string;
  links: string;
};

export type FontsType = {
  bold: string;
  regular: string;
  light: string;
};

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: ColorsType;
  fonts: FontsType;
}
