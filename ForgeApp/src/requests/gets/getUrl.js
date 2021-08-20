import {fetch} from "@forge/api";

export default async function GetDomen(basicToken){

    const res = await fetch("https://actionsofemployees.herokuapp.com/domen", {

        headers:{
            "Authorization": `Basic ${basicToken}`
        }
    });
    
    return await res.json();

}