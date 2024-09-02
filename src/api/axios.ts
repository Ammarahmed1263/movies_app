import axios from "axios";
import Config from "react-native-config";
import { MOVIE_BASE_URL } from "../constants";

const instance = axios.create({
  baseURL: MOVIE_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${Config.TMDB_TOKEN}`,
  },
});


export default instance;