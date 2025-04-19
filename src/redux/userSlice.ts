import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie} from 'types/movieTypes';
import {preferencesType} from 'types/userTypes';
import {RootState} from './types';

interface intialStateType {
  userToken: string | null;
  FCMToken: string | null;
  preferences: preferencesType;
}

const initialState: intialStateType = {
  userToken: null,
  FCMToken: null,
  preferences: {
    language: 'en',
    notification: true,
  },
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
    setFCMToken(state, action: PayloadAction<string>) {
      state.FCMToken = action.payload;
    },
    clearFCMToken(state) {
      state.FCMToken = null;
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

export const {
  setUserToken,
  clearUserToken,
  setFCMToken,
  clearFCMToken,
  updateUserPreferences,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
