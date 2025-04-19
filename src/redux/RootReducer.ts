import {combineReducers} from '@reduxjs/toolkit';
import {moviesReducer} from './movies';
import userReducer from './userSlice';
import favoritesReducer from './favoritesSlice';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favoriteConfig = {
  key: 'favorites',
  storage: AsyncStorage,
  whitelist: ['favorites'],
};

export const RootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  favorites: persistReducer(favoriteConfig, favoritesReducer),
});
