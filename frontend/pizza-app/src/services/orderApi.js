import axios from 'axios';

const orderApi = axios.create({
    baseURL:"http://localhost:8080/pizza",
    timeout:200
});

export default orderApi;