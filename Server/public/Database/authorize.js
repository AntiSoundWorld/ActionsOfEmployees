import connectDatebase from "./connectToDatebase.js";
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();

export default async function authorize(response, basicToken){
    
    const connect = connectDatebase();

    const queryString = `SELECT basicToken FROM users WHERE basicToken='${basicToken}'`;
    
    connect.query(queryString, (err, res) => {
        
        if(err){
            console.log(err);
        }

        if(res.length === 0){
            response.sendStatus(401);
            return;
        }
        
        let getRefreshToken = `SELECT refresh_access_token_Bitbucket FROM users WHERE basicToken='${basicToken}'`;
        connect.query(getRefreshToken, (err, res) => {
            
            request.post('https://bitbucket.org/site/oauth2/access_token', {
                form:{
                    client_id: process.env.BITBUCKET_CLIENT_ID,
                    client_secret: process.env.BITBUCKET_SECRET,
                    "grant_type": "refresh_token",
                    "refresh_token": res[0].refresh_access_token_Bitbucket,
                }
            },
            function(error, meta, body){
                
                let data = JSON.parse(body);
                
                console.log(data['access_token']);
                response.send(data['access_token']);
                
                let query = `UPDATE users SET 
                accessToken_BitBucket='${data['access_token']}', 
                refresh_access_token_Bitbucket='${data['refresh_token']}'
                WHERE basicToken='${basicToken}'`
                
                connect.query(query, (err, res) => {
                    
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(res);
                    }
                })
            });
        })
    });
}