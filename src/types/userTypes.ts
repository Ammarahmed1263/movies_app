import {ImageSourcePropType} from 'react-native';
import {Movie, MovieArray, MovieSummary} from './movieTypes';
import {Asset} from 'react-native-image-picker';

export type User = {
  email: string;
  password: string;
};

export type preferencesType = {
  language: 'en' | 'ar';
  theme: 'light' | 'dark';
  notification: boolean;
};

export type ListType = {
  id: number | 'add';
  title: string;
  poster_path?: Asset | null | string;
  movies: MovieSummary[];
};
