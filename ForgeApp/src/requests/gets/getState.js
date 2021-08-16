import {fetch} from "@forge/api";

export default async function GetState(basicToken){

    const res = await fetch("https://actionsofemployees.herokuapp.com/get_state", {

        headers:{
            "Authorization": `Basic ${basicToken}`
        }
    });

   return await res.json();
}