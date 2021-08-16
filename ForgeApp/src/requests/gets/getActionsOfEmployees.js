import {fetch} from "@forge/api";

export default async function GetActionsOfEmployees(basicToken){

    const res = await fetch("https://actionsofemployees.herokuapp.com/get_actions_of_employees", {

        headers:{
            "Authorization": `Basic ${basicToken}`
        }
    });

    return JSON.parse(await res.json());
}