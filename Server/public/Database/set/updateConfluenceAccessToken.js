import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
import isStateExist from "../isExist/isStateExist.js";
dotenv.config();

export default async function updateConfluenceAccessToken(datas, state){

    const connect = connectDatebase();

    const status = await isStateExist(state);
    
    if(status === 404){
        return status;
    }

    let update = '';

    if (datas['refresh_token'] === undefined) {
        update = `UPDATE users SET 
        accessToken_Confluence='${datas['access_token']}'
        WHERE state='${state}'`
    }
    else{
        update = `UPDATE users SET 
        accessToken_Confluence='${datas['access_token']}',
        refresh_access_token_Confluence='${datas['refresh_token']}'
        WHERE state='${state}'`
    }
    
    await connect.query(update);
}