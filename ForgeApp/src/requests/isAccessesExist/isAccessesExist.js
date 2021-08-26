import {fetch} from "@forge/api";

export default async function isAccessesExist(basicToken){


    const res = await fetch("https://actionsofemployees.herokuapp.com/is_accesses_exist", {

        headers: {
            "Authorization": `Basic ${basicToken}`,
            'ContentType': 'application/json'
        }
    });

    return await res.json();
}