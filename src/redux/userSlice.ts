import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "types/movieTypes";
import { preferencesType } from "types/userTypes";
import { RootState } from "./types";

interface intialStateType {
  id: string | null;
  preferences: preferencesType;
  favorites: Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>[] 
}

const initialState: intialStateType = {
  id: null,
  preferences: {
    language: 'en',
    theme: 'dark',
  },
  favorites: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    clearUserId(state) {
      state.id = null
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;

