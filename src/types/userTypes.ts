import { ImageSourcePropType } from "react-native";
import { Movie, MovieArray } from "./movieTypes";

export type User = {
  email: string;
  password: string;
}

export type preferencesType = {
  language: 'en' | 'ar';
  theme: 'light' | 'dark';
};

export type UserListType = {
  id: number | 'add';
  title: string;
  poster_path?: ImageSourcePropType;
  movies: Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>[];
}