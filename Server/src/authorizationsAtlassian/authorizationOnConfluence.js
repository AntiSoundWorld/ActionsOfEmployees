import request from 'request';
import dotenv from 'dotenv';

import accessResourse from './accessResourese.js';
import updateConfluenceAccessToken from '../../public/Database/set/updateConfluenceAccessToken.js';

export default async function authorizationOnConfluence(code, state){

    request.post('https://auth.atlassian.com/oauth/token', {
        form:{
            client_id: process.env.JIRA_CLIENT_ID,
            client_secret: process.env.JIRA_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": `https://${process.env.DOMEN}/authorize` 
        }
    },
    async function(error, meta, body){
        

        let datas = JSON.parse(body);

        updateConfluenceAccessToken(datas, state);

        // await accessResourse(datas['access_token']);
    })
}