import { useState } from "react";
import defaultDates from "../tools/tools";

const[dates, setDates] = useState(defaultDates());

export function GetDates(){

    return dates;
}

export function SetDates(newDates){
    setDates(newDates);
}