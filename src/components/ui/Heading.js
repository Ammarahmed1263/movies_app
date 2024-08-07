import { Text } from "react-native"
import { useTheme } from "../../store/context/ThemeContext"


export default function Heading({style, children}) {
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