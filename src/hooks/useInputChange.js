import { useContext, useState } from "react";
import { CompanyContext } from "../pages/Company/context/CompanyContext";
import { addressAxios } from "../config/axios";

export const useInputChange = () => {
  const emptyAddress = {
    bairro: null,
    cep: null,
    complemento: null,
    ddd: null,
    gia: null,
    ibge: null,
    localidade: null,
    logradouro: null,
    siafi: null,
    uf: null,
  };

  const { company, setCompany } = useContext(CompanyContext);
  const [addressAPI, setAddressAPI] = useState(emptyAddress);
  const [cep, setCep] = useState(null);
  const [existCep, setExistCep] = useState(true);

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _company = { ...company };
    _company[`${name}`] = val;
    setCompany(_company);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _company = { ...company };
    _company[`${name}`] = val;
    setCompany(_company);
  };

  const onChangeCep = (e) => {
    let _company = { ...company };
    let _address = { ...company.address };
    let _addressAPI = { ...addressAPI };

    _address[`cep`] = "";
    _address[`street`] = "";
    _address[`district`] = "";
    _address[`city`] = "";
    _company["address"] = _address;
    let _cep = e.target.value;
    if (_cep?.length != 8) {
      setExistCep(null);
      setCompany(_company);
      return;
    }

    addressAxios
      .get(`${_cep}/json`)
      .then((res) => {
        console.log(res.data?.erro);
        if (res.data?.erro !== true) {
          _addressAPI = { ...res.data };
          _address[`cep`] = _cep;
          _address[`street`] = _addressAPI.logradouro;
          _address[`district`] = _addressAPI.bairro;
          _address[`city`] = _addressAPI.localidade;
          _company["address"] = _address;
        } else {
          setExistCep(false);
          _address[`street`] = "";
          _address[`bairro`] = "";
          _address[`city`] = "";
          _company["address"] = _address;
        }
      })
      .catch((err) => {})
      .finally(() => {
        setCompany(_company);
      });
  };

  const onInputAddressChange = (e, name) => {
    const value = e.target.value || "";
    let _company = { ...company };
    let _address = { ...company.address };

    _address[`${name}`] = value;
    _company["address"] = _address;
    setCompany(_company);
    console.log(_company);
  };

  return {
    onInputChange,
    onInputNumberChange,
    onInputAddressChange,
    onChangeCep,
    cep,
    existCep,
  };
};