import axios from 'axios';
import Config from 'react-native-config';
import {MOVIE_BASE_URL} from '../constants';
import {I18nManager} from 'react-native';

const instance = axios.create({
  baseURL: MOVIE_BASE_URL,
  params: {language: I18nManager.isRTL ? 'ar-EG' : 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${Config.TMDB_TOKEN}`,
  },
});

export default instance;
