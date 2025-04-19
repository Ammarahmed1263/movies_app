import {createSlice} from '@reduxjs/toolkit';
import {Movie} from 'types/movieTypes';

interface intialStateType {
  favorites: Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>[];
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
    setFavorites: (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        movie => movie.id !== action.payload,
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {setFavorites, addFavorite, removeFavorite, setLoading} =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
