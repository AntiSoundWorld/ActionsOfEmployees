import fetch from "node-fetch";

export default async function IsJiraAccessExist(basicToken){

    let isJiraAccessExist = false;

    const res = await fetch("https://actionsofemployees.herokuapp.com/is_jira_accessToken_exist", {

        headers: {
            "Authorization": `Basic ${basicToken}`
        }
    });

    const status = await res.status();

    if(status === 200){

        isJiraAccessExist = true;
    }
  
    return isJiraAccessExist;
}