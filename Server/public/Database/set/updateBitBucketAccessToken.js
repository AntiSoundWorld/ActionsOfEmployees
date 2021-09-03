import dotenv from 'dotenv';
import request from 'request';
import connectDatebase from '../connectToDatebase.js';
import isStateExist from '../isExist/isStateExist.js';

dotenv.config();

export default async function updateBitBucketAccessToken(datas, state){

    const connect = connectDatebase();

    const status = await isStateExist(state);
    
    console.log('status', status);

    if(status === 401){
        return status;
    }
    
    let update = `UPDATE users SET 
    accessToken_BitBucket='${datas['access_token']}', 
    refresh_access_token_Bitbucket='${datas['refresh_token']}'
    WHERE state='${state}'`

   await connect.query(update);

}