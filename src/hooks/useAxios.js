import { useState, useEffect } from "react";
import axios from "../config/axios";

export const useAxios = () => {
    const [data, setData] = useState([]);
    const [peopleList, setPeopleList] = useState([]);
    const [companyCnpj, setCompanyCnpj] = useState([]);
    const [companyAddress, setCompanyAddress] = useState([]);

    //get
    const GetAxios = async (url) => {
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

    //post
    const CreatePeople = (url, people) => {
        axios.post(url, people, {
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
            },
        });
    };

    //put
    const PutCompany = (url, company) => {
        axios.put(url, company, {
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
            },
        });
    };
    
    //delete
    const DeleteAxios = async (url, id) => {
        await axios.delete(`${url}/${id}`);
    };

    return {
        data, 
        peopleList, 
        companyCnpj, 
        companyAddress,
        GetAxios, 
        CreateCompany,
        CreatePeople,
        PutCompany,
        DeleteAxios, 
        SearchPeopleInCompany,
        SearchCnpj
    };
}