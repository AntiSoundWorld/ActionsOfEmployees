import {fetch} from "@forge/api";

export default async function  CollectActionsOfEmployees(basicToken, dates){

    const res = await fetch(`https://actionsofemployees.herokuapp.com/collect_information`, {

        method: "POST",
        headers:{
            "Authorization": `Basic ${basicToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dates)
    });

    return res.status;
}