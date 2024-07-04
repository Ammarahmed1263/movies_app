import { SafeAreaView, StatusBar, View } from "react-native";
import SearchBar from "../components/search/SearchBar";

function SearchScreen() {
  return (
    <SafeAreaView style={{marginTop: StatusBar.currentHeight}}>
      <SearchBar />      
    </SafeAreaView>
  )
}

export default SearchScreen;