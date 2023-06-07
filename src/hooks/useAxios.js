import { useState, useEffect } from "react";
import axios from "../config/axios";

export const useAxios = () => {
    const [data, setData] = useState([]);
    const [peopleList, setPeopleList] = useState([]);
    const [companyCnpj, setCompanyCnpj] = useState([]);
    const [companyAddress, setCompanyAddress] = useState([]);

    //get
    const GetCompany = async (url) => {
        await axios.get(url).then((res) => {
            setData(res.data);
        });
    };

    //get - Search CNPJ
    const SearchCnpj = (url, cnpj) => {
        axios.get(`${url}/${cnpj}`)
        .then((res) => {
            setCompanyCnpj(res.data);
            setCompanyAddress(res.data.address);
        })
        .catch((err) => {
            console.log(err);
        })
    };


    //get - Search People in Company
    const SearchPeopleInCompany = (url, id) => {
        axios.get(`${url}/${id}`)
        .then((res) => {
            setPeopleList(res.data.peoples);
            console.log(res.data.peoples);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    //post
    const CreateCompany = (url, company) => {
        axios.post(url, company, {
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
            },
        });
    };
    
    //delete
    const DeleteCompany = async (url, id) => {
        await axios.delete(`${url}/${id}`);
    };

    return {
        data, 
        peopleList, 
        companyCnpj, 
        companyAddress,
        GetCompany, 
        CreateCompany,
        DeleteCompany, 
        SearchPeopleInCompany,
        SearchCnpj
    };
}