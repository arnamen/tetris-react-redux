import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tetris-84317.firebaseio.com/'
});

export default instance;