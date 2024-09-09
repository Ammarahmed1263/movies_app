import { FC, ReactNode } from "react";
import { Text, TextStyle } from "react-native"
import { useTheme } from "@contexts/ThemeContext"

interface AppHeadingProps {
  style?: TextStyle,
  children: ReactNode
}

const AppHeading: FC<AppHeadingProps> = ({style, children}) => {
  const { fonts, colors } = useTheme();

  return (
    <Text
    style={[{
      fontSize: 25,
      fontFamily: fonts.bold,
      color: colors.paleShade,
    }, style]}>
    {children}
  </Text>
  )
}

export default AppHeading;