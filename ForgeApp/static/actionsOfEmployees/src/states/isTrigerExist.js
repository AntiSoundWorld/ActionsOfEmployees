import { useState } from "react";

const[isTrigerExist, setIsTrigerExist] = useState(false);

export function IsTrigerExist(){

    return isTrigerExist;
}

export function SetIsTrigerExist(newIsTrigerExist){

    isTrigerExist(newIsTrigerExist);
}