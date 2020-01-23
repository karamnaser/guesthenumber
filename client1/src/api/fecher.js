import axios from 'axios';

const fecher = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

export default fecher;