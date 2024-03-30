import { View, TextInput, StyleSheet } from "react-native"
import GlobalStyles from "../../styles/GlobalStyles";
import Icon from 'react-native-vector-icons/Ionicons'

function SearchBar() {
  return (
  <View style={styles.searchBar}>
    <TextInput 
      placeholder="Search Movies"
      placeholderTextColor={GlobalStyles.primary700}
      cursorColor={GlobalStyles.primary700}
      style={styles.input}
    />
    <View style={styles.iconContainer}>
      <Icon name='search-sharp' size={30} color={GlobalStyles.secondary500} />
    </View>
  </View>
  )
}

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.7,
    borderColor: GlobalStyles.secondary600,
    marginTop: 20,
    borderRadius: 50,
    marginHorizontal: 15,
    backgroundColor: GlobalStyles.primary500
  },
  input: {
    color: GlobalStyles.primary700,
    fontSize: 16,
    paddingHorizontal: 15
  },
  iconContainer: {
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(106, 106, 106, 0.54)',
    borderRadius: 30,
    padding: 7,
    paddingLeft: 10
  }
})