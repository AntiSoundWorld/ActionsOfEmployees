import {fetch} from "@forge/api";

export default async function IsJiraAccessExist(basicToken){

    let isJiraAccessExist = false;

    const res = await fetch("https://actionsofemployees.herokuapp.com/is_jira_accessToken_exist", {

        headers: {
            "Authorization": `Basic ${basicToken}`
        }
    });


    if(res.status === 200){

        isJiraAccessExist = true;
    }
  
    return isJiraAccessExist;
}