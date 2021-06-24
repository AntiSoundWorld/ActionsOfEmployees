import dotenv from 'dotenv';
import request from 'request';
import connectDatebase from '../connectToDatebase.js';
dotenv.config();

export default async function setBitBucketAccessToken(code, state){

    const connect = connectDatebase();

    const queryString = `SELECT state FROM users WHERE state='${state}'`;

    connect.query(queryString, (err, res) => {
        
        if(err){
            console.log(err);
        }
        
        if(res.length === 0){
            console.log('state is not exist')
            return;
        }
        
        console.log(process.env.BITBUCKET_CLIENT_ID)
        console.log(process.env.BITBUCKET_SECRET)
        request.post('https://bitbucket.org/site/oauth2/access_token', {
            form:{
                client_id: process.env.BITBUCKET_CLIENT_ID,
                client_secret: process.env.BITBUCKET_SECRET,
                "code": code,
                "grant_type": "authorization_code",
            }
        },
        function(error, meta, body){
            
            let data = JSON.parse(body);
            
            // response.send(data['access_token']);
            let query = `UPDATE users SET 
            accessToken_BitBucket='${data['access_token']}', 
            refresh_access_token_Bitbucket='${data['refresh_token']}'
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