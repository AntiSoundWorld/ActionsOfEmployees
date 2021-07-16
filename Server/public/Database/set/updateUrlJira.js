import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
import isJiraAccessTokenExist from "../isExist/isJiraAccessTokenExist.js";
dotenv.config();

export default async function updateUrlJira(datas, accessToken_Jira){

    const connect = connectDatebase();

    let update = `UPDATE users SET 
    url_Jira='${datas[0].url}'
    WHERE accessToken_Jira='${accessToken_Jira}'`
    
    connect.query(update);
}