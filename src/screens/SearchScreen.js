import { TextInput, StyleSheet, View, Image } from "react-native";

function SearchScreen() {
  return (
    <View style={styles.searchBar}>
      <TextInput 
        placeholder="Search Movies"
      />
      <View style={{width: 50, height: 50, borderRadius: 50, backgroundColor: 'gray'}} ></View>
    </View>
  )
}

export default SearchScreen;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 20,
    borderRadius: 50,
    marginHorizontal: 15
  }
})