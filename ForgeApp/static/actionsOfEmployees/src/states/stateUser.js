import { useState } from "react";
import { invoke } from "@forge/bridge";
import { getBasicToken } from "./basicToken";

const[stateUser, setStateUser] = useState(localStorage.getItem('state'));

export function GetStateUser(){

    return stateUser;
}

export function SetStateUser(newStateUser){

    return state;
}

useEffect(() => {

    const basicToken = getBasicToken();

    if(stateUser === null && basicToken != null){

        invoke('getState', {basicToken: basicToken}).then(stateUser => {
            setStateUser(stateUser);
        });
    }
},[state]);