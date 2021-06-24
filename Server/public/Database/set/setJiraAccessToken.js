import connectDatebase from "../connectToDatebase.js";
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();

export default async function getJiraAccessToken(code, state){

    const connect = connectDatebase();
    
    const queryString = `SELECT state FROM users WHERE state='${state}'`;
    
    connect.query(queryString, (err, res) => {
        
        if(err){
            console.log(err);
        }
        
        if(res.length === 0){
            console.log(`state is not exist! state=${state}`)
            return;
        }
        
        request.post('https://auth.atlassian.com/oauth/token', {
            form:{
                client_id: process.env.JIRA_CLIENT_ID,
                client_secret: process.env.JIRA_SECRET,
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": `https://${process.env.DOMEN}/authorize` 
            }
        },
        function(error, meta, body){
            
            let data = JSON.parse(body);
            
            if (error) {
                console.log(error);
            }
            // response.send(data['access_token']);
            
            let query = `UPDATE users SET 
            accessToken_Jira='${data['access_token']}'
            WHERE state='${state}'`
            
            connect.query(query, (err, res) => {
                
                if(err){
                    console.log(err);
                }
                else{
                    console.log(res);
                }
            })
        })
    })
}