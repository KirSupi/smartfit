import {useEffect, useState} from "react";

export const useUserLocalStorage = (userID) => {
    const initData = JSON.parse(localStorage.getItem(userID)) || {...userLocalStorageStructure};
    const [data, setData] = useState(initData);
    useEffect(
        ()=>{
            localStorage.setItem(userID, JSON.stringify(data));
        }, [data]
    );
    const setDataHandler = (key, val) => {
        setData({...data, [key]: val});
    }
    return [data, setDataHandler];
}
const userLocalStorageStructure = {
    settings: {
        AdminStatsManyWebs: {
            collapsedColumns: [],
        }
    }
}