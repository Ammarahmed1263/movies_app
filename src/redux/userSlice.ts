import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie} from 'types/movieTypes';
import {preferencesType} from 'types/userTypes';
import {RootState} from './types';

interface intialStateType {
  userToken: string | null;
  FCMToken: string | null;
  preferences: preferencesType;
  favorites: Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>[];
}

const initialState: intialStateType = {
  userToken: null,
  FCMToken: null,
  preferences: {
    language: 'en',
    notification: true,
  },
  favorites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken(state, action: PayloadAction<string>) {
      state.userToken = action.payload;
    },
    clearUserToken(state) {
      state.userToken = null;
    },
    updateUserPreferences(
      state,
      action: PayloadAction<Partial<preferencesType>>,
    ) {
      state.preferences = {...state.preferences, ...action.payload};
    },
    logout(state) {
      state = initialState;
    },
  },
});

export const {setUserToken, clearUserToken, updateUserPreferences} =
  userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
