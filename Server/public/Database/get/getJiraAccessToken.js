import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
dotenv.config();

export default async function getJiraAccessToken(response, basicToken){

    const connect = connectDatebase();

    const queryString = `SELECT basicToken FROM users WHERE basicToken='${basicToken}'`;
    
    connect.query(queryString, (err, res) => {
        
        if(err){
            console.log(err);
        }

        if(res.length === 0){
            // response.sendStatus(401);
            return;
        }
        
        let getRefreshToken = `SELECT accessToken_Jira FROM users WHERE basicToken='${basicToken}'`;


        connect.query(getRefreshToken, (err, res) => {
            
            if(err){
                console.log(err);
            }

            if(res[0].accessToken_Jira === null || res[0].accessToken_Jira === undefined){
                response.sendStatus(404);
                return;
            }
            else{
                response.sendStatus(200);
            }
        });
    });
}