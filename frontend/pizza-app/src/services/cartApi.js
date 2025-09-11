import axios from "axios";

const cartApi = axios.create({
    baseURL:"http://localhost:8080/cart",
    timeout:2000
});

export default cartApi;