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

interface FontStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight?: string;
}

export interface FontsType {
  light: FontStyle;
  regular: FontStyle;
  bold: FontStyle;
  heading: FontStyle;
  subheading: FontStyle;
  body: FontStyle;
  caption: FontStyle;
}

export type FontVariants = 'heading' | 'subheading' | 'body' | 'caption' | 'light' | 'regular' | 'bold'

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: ColorsType;
  fonts: FontsType;
}
