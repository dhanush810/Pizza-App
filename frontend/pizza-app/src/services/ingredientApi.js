import axios from 'axios';

const ingredientApi = axios.create({
    baseURL:"http://localhost:8080/ingredient",
    timeout:2000
});

export default ingredientApi;