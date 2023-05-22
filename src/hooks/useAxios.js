import { useState, useEffect } from "react";
import axios from "../config/axios";

export const useAxios = (url) => {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        axios.get(url).then((res) => {
            setInfo(res.info);
        });
    }, []);

    return {info};
}