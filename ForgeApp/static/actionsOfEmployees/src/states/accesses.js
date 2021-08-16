import { useState } from "react";
import { SetActionsOfEmployees } from "./ActionsOfEmployees";
import { IsTrigerExist, SetIsTrigerExist } from "./isTrigerExist";
import { SetList } from "./list";

const[accesses, setAccesses] = useState(null);

export function GetAccesses(){

    return accesses;
}

export function SetAccesses(newAccesses){

    setAccesses(newAccesses);
}

useEffect(() => {

    if(accesses === null){
        return;
    }

    if(accesses.isBitBucketAccessExist && accesses.isJiraAccessExist && IsTrigerExist() === false){
        
        invoke("collectInformations", {basicToken: basicToken, dates: dates});

        setTimeout(() => {
    
            invoke("getActionsOfEmployees", {basicToken: basicToken}).then(actionsOfEmployees => {
                SetList(actionsOfEmployees);
                SetActionsOfEmployees(actionsOfEmployees);
            });
        }, 5000);

        SetIsTrigerExist(true);
    }
    
   
    
}, [accesses]);
