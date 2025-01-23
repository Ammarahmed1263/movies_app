import { useTheme } from "@contexts/ThemeContext";
import SearchBar from "@molecules/SearchBar";
import { height, vs } from "@styles/metrics";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";

const AddToListSheet = (props: SheetProps<'add-to-list'>) => {
  const {colors} = useTheme();
  const [search, setSearch] = useState('');
  
  return (
    <ActionSheet
        id={props.sheetId}
        containerStyle={{backgroundColor: colors.primary500}}
        indicatorStyle={{backgroundColor: colors.primary700}}
        snapPoints={[50, 100]}
        initialSnapIndex={1}
        gestureEnabled>
        <View style={styles.sheetContainer}>
          <SearchBar keyword={search} setKeyword={setSearch} />
          {/* <Button
            title="Search"
            onPress={() => {
              // addMovieToList(
              //   {
              //     id: 12,
              //     title: 'hello',
              //     poster_path: null,
              //     overview: 'testing this shit',
              //   },
              //   7725,
              // );
              removeMovieFromlist(12, 7725);
              addMovieRef.current?.hide();
            }}
          /> */}
        </View>
      </ActionSheet>
  )
}

export default AddToListSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    paddingTop: vs(10),
    minHeight: height * 0.80
  },
})