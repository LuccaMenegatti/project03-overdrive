import axiosConfig from 'axios';

const companyAxios = axiosConfig.create({
    baseURL: "https://localhost:7166/api/Company"
});

const addressAxios = axiosConfig.create({
    baseURL: "https://viacep.com.br/ws/",
    // timeout: 1000,
});
  
const peopleAxios = axiosConfig.create({
    baseURL: "https://localhost:7166/api/People",
    headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
    },
    // timeout: 1000,
});

export {companyAxios, addressAxios, peopleAxios};