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

export type ListType = {
  id: number | 'add';
  title: string;
  poster_path?: string | null;
  movies: Movie[];
}