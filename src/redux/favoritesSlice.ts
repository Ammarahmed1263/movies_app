import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieSummary} from 'types/movieTypes';

interface intialStateType {
  favorites: Pick<MovieSummary, 'id' | 'title' | 'overview' | 'poster_path'>[];
  loading: boolean;
}

const initialState: intialStateType = {
  favorites: [],
  loading: true,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<MovieSummary[]>) => {
      state.favorites = action.payload;
      state.loading = false;
    },
    addFavorite: (state, action: PayloadAction<MovieSummary>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        movie => movie.id !== action.payload,
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setFavorites, addFavorite, removeFavorite, setLoading} =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
