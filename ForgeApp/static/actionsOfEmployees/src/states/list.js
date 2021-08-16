import { useState } from "react";

const[list, setList] = useState([]);

export function GetList(){
    return list;
}

export function SetList(newList){

    setList(newList);
}