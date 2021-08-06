import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateJiraAccessId(datas, accessToken_Jira){

    const connect = connectDatebase();

    let update = `UPDATE users SET 
    access_id_Jira='${datas[0].id}'
    WHERE accessToken_Jira='${accessToken_Jira}'`;
    
    await connect.query(update);
}