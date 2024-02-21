import { useEffect, useState } from "react";
import { View } from "react-native";
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


function HomeScreen() {
    const [images, setImage] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.request('https://api.themoviedb.org/3/movie/now_playing', options)
                // console.log(response.data);
                for(let i = 0; i < 10; i++) {
                    console.log(response.data.results[i].original_title)
                }
            } catch (e) {
                console.log('failed to retrieve movies', e);
            } finally {
                console.log('done here')
            }
        })()
    })
    
    return (
        <View style={{ flex: 1, backgroundColor: '#31573b' }}>
        </View>
    )
}

export default HomeScreen;