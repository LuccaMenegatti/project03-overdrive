import { useState } from "react";
import axiosConfig from "axios";

export const useAddress = () => {
  const emptyAddress = {
    logradouro: "",
    bairro: "",
    localidade: "",
  };

  const [address, setAddress] = useState(emptyAddress);

  const axios = axiosConfig.create({
    baseURL: "https://viacep.com.br/ws/",
  });

  const getAddress = (cep) => {
    axios
      .get(`${cep}/json`)
      .then((res) => {
        setAddress(res.data);
      })
      .catch(() => {
        setAddress(emptyAddress);
      });
  };

  return { address, getAddress };
};