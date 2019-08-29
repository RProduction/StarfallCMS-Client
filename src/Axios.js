import axios from 'axios';

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3333/' : '/';

export default axios.create({
    baseURL: url,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});