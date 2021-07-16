import request from 'request';
import dotenv from 'dotenv';
import updateBitBucketAccessToken from '../../public/Database/set/updateBitBucketAccessToken.js';

export default async function refreshBitBucketAcesssToken(refreshAccessToken, state){

    request.post('https://bitbucket.org/site/oauth2/access_token', {
        form:{
            client_id: process.env.BITBUCKET_CLIENT_ID,
            client_secret: process.env.BITBUCKET_SECRET,
            "grant_type": "refresh_token",
            "refresh_token": refreshAccessToken,
        }
    },
    function(error, meta, body){
        
        let datas = JSON.parse(body);
        updateBitBucketAccessToken(datas, state);
    })
}