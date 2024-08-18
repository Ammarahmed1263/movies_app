import { Text } from "react-native"
import { useTheme } from "../../../context/ThemeContext"


export default function AppHeading({style, children}) {
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