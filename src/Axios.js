import axios from 'axios';
export default axios.create({
    baseURL: '/',
    responseType: "json",
    headers: {
        'Content-Type': 'application/json'
    }
});