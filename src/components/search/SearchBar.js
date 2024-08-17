import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
;

// fix resizing
function SearchBar() {
  const { colors, fonts } = useTheme();

  return (
    <View
      style={{
        ...styles.searchBar,
        borderColor: colors.secondary600,
        backgroundColor: colors.primary500,
      }}>
      <TextInput
        placeholder="Search Movies"
        placeholderTextColor={colors.primary700}
        cursorColor={colors.primary700}
        style={{...styles.input, color: colors.primary700, fontFamily:  fonts.regular}}
      />
      <View style={styles.iconContainer}>
        <Icon name="search-sharp" size={30} color={colors.secondary500} />
      </View>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1.6,
    borderBottomWidth: 1.6,
    borderWidth: 0.9,
    marginTop: 20,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  input: {
    flex: 8,
    fontSize: 13,
    paddingHorizontal: 15,
  },
  iconContainer: {
    flex: 1,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(106, 106, 106, 0.54)',
    borderRadius: 30,
    padding: 7,
    paddingLeft: 10,
  },
});
