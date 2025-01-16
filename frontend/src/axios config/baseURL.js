import axios from "axios";

const Api = axios.create({
    baseURL : "http://localhost:7000/api/v1",
    withCredentials:true
});

export default Api;

