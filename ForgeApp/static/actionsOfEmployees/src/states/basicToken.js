import { invoke } from "@forge/bridge";
import { useState } from "react";
import { SetIsAccountExist } from "./isAccountExist";

const[basicToken, setBasicToken] = useState(localStorage.getItem("basicToken"));

export function getBasicToken(){

    return basicToken;
}

export function SetBasicToken(newBasicToken){
    setBasicToken(newBasicToken);
}

useEffect(() => {
        
    if(basicToken === null){

        setMainPage(<LoginForm setBasicToken={setBasicToken}/>);
        return;
    }

    invoke('isAccountExist', {basicToken: basicToken}).then(isAccountExist => {
        SetIsAccountExist(isAccountExist);
    });

},[basicToken]);