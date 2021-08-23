import {fetch} from "@forge/api";

export default async function GetDomen(basicToken){

    const res = await fetch("https://actionsofemployees.herokuapp.com/domen", {

        headers:{
            "Authorization": `Basic ${basicToken}`
        }
    });
    
    console.log(res)
    return await res.json();

}