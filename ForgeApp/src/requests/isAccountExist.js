import fetch from "node-fetch";

export default async function isAccountExist(basicToken){

    let isAccountExist = false;

    let res = await fetch("https://actionsofemployees.herokuapp.com/is_account_exist", {
        method: "GET",
        headers: {
            "Authorization": `Basic ${basicToken}`
        }
    });

    let status = await res.status;

    if(status === 200){

        isAccountExist = true;
    }

    return isAccountExist;
}