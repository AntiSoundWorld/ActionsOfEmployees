import request from 'request';
import dotenv from 'dotenv';
import updateJiraAccessToken from '../../public/Database/set/updateJiraAccessToken.js';

export default async function refreshJiraAcesssToken(refreshAccessToken, state){

    request.post('https://auth.atlassian.com/oauth/token', {
        headers:{
            'Content-Type': 'application/json'
        },
        form:{
            client_id: process.env.JIRA_CLIENT_ID,
            client_secret: process.env.JIRA_SECRET,
            "grant_type": "refresh_token",
            "refresh_token": refreshAccessToken,
        }
    },
    function(error, meta, body){
        
        let datas = JSON.parse(body);

        updateJiraAccessToken(datas, state);
    })
}