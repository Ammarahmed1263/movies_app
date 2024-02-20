import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import axios from 'axios'
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTVjMDE0NjIxZGNlNGNhNGYzMzI2NWQ2MzA5ZmZhMiIsInN1YiI6IjY1MjY2MGZmZmQ2MzAwNWQ3YjI3MjViZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9c-Qit7_k7d4XANLn3OS2uBhB2VqpZKoGqMZUtgw3fc'

const options = {
    method: 'GET',
    params: {language: 'en-US', page: '1'},
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };


const Home = () => {
    const [images, setImage] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.request('https://api.themoviedb.org/3/movie/now_playing', options)
                console.log(response);
            } catch (e) {
                console.log('failed to retrieve movies', e);
            } finally {
                console.log('done here')
            }
        })()
    })
    
    return (
        <View>
            
        </View>
    )
}

export default Home;