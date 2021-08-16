import {fetch} from "@forge/api";

export default async function IsContentExist(basicToken){

    let isContentExist = false;

    const res = await fetch("https://actionsofemployees.herokuapp.com/is_content_exist", {

        headers: {
            "Authorization": `Basic ${basicToken}`
        }
    });

    if(res.status === 200){

        isContentExist = true;
    }
  
    return isContentExist;
}