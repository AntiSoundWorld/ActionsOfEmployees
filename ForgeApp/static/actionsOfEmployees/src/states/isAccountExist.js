import { useState } from "react";
import { SetAccesses } from "./accesses";
import { getBasicToken } from "./basicToken";

const[isAccountExist, setIsAccountExist] = useState(null);

export function getIsAccountExist(){

    return isAccountExist;
}

export function SetIsAccountExist(isAccountExist){

    setIsAccountExist(isAccountExist);
}

useEffect(() => {

    if(isAccountExist){

        localStorage.setItem("basicToken", getBasicToken());

        setInterval(() => {

            invoke('isAccessesExist', {basicToken: basicToken}).then(isAccessesExist => {

                SetAccesses(isAccessesExist);
            });
        }, 5000);
    }
}, [isAccountExist]);