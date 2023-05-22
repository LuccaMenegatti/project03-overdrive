import axiosConfig from 'axios';

const axios = axiosConfig.create({
    baseURL: "https://localhost:7166/api/"
});

export default axios;