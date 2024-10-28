import { createSlice } from "@reduxjs/toolkit";
import { intialState } from "./searchTypes";
import { searchMoviesByKeyword } from "./searchActions";

const initialState: intialState = {
  results: [],
  loading: false,
  page: 1,
  total_pages: 1,
}


const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.results = [];
      state.page = 1;
      state.total_pages = 1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    incrementPage: (state) => {
      state.page += 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchMoviesByKeyword.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(searchMoviesByKeyword.fulfilled, (state, action) => {
      state.results = [...state.results, ...action.payload.results];
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.loading = false;
    })
    builder.addCase(searchMoviesByKeyword.rejected, (state) => {
      state.loading = false;
    })
  }
})

export const { resetSearch, setLoading, incrementPage } = searchSlice.actions;
export default searchSlice.reducer;