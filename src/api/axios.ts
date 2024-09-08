import axios from "axios";
import Config from "react-native-config";
import i18n from "../i18n";
import { MOVIE_BASE_URL } from "../constants";

const instance = axios.create({
  baseURL: MOVIE_BASE_URL,
  params: {language: i18n.language === 'ar' ? 'ar-EG' : 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${Config.TMDB_TOKEN}`,
  },
});


export default instance;