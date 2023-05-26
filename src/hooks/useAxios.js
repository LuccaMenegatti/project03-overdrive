import { useState, useEffect } from "react";
import axios from "../config/axios";

export const useAxios = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url).then((res) => {
            setData(res.data);
        });
    }, []);

    return {data};
}