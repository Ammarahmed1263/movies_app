import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie} from 'types/movieTypes';
import {preferencesType} from 'types/userTypes';
import {RootState} from './types';

interface intialStateType {
  userToken: string | null;
  preferences: preferencesType;
  favorites: Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>[];
}

const initialState: intialStateType = {
  userToken: null,
  preferences: {
    language: 'en',
    theme: 'dark',
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
  },
});

export const {setUserToken, clearUserToken} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
