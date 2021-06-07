import mysql from 'mysql';
import request from 'request';
import express from 'express';

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "Qweasdzxc117!"
});

connect.connect(err => {
    
    if(err){
        console.log(err);

        return err;
    }
    else{
        console.log('Database login successfull!');
    }
});

const selectDatabase = `USE users`;

connect.query(selectDatabase, (err, res) => {

    console.log(err);
    if(err){
        console.log('err mysql select database');
    }
    else{
        console.log('Datebase selected |users|');
    }
    
});

export async function login(response, basicToken){
    
    const queryString = `SELECT basicToken FROM users WHERE basicToken='${basicToken}'`;
    
    connect.query(queryString, (err, res) => {
        
        if(res.length === 0){
            response.sendStatus(401);
            return;
        }
        
        let getRefreshToken = `SELECT refresh_access_token_Bitbucket FROM users WHERE basicToken='${basicToken}'`;
        connect.query(getRefreshToken, (err, res) => {
            
            request.post('https://bitbucket.org/site/oauth2/access_token', {
                form:{
                    client_id: "gDd2kRzMDDKFM7Pdwg",
                    client_secret: "V3gGT5Cv8fXH6Lu2A3FyD2pPdLqMauyq",
                    "grant_type": "refresh_token",
                    "refresh_token": res[0].refresh_access_token_Bitbucket,
                }
            },
            function(error, meta, body){
                
                let data = JSON.parse(body);

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

export async function registerUser(email, authorization, code){

    console.log(email);
    console.log(authorization);
    console.log('code', code);

    const getEmail = `SELECT email FROM users WHERE email='${email}'`;
    
    connect.query(getEmail, (err, res) => {
        
        if(res.length !== 0){
            return;
        }
        
        request.post('https://bitbucket.org/site/oauth2/access_token', {
            form:{
                client_id: "gDd2kRzMDDKFM7Pdwg",
                client_secret: "V3gGT5Cv8fXH6Lu2A3FyD2pPdLqMauyq",
                "code": code,
                "grant_type": "authorization_code",
            }
        },
        function(error, meta, body){
            
            if(error){
                console.log(error);
                return;
            }

            let data = JSON.parse(body);

            const queryString = `INSERT INTO 
            users
            (email, basicToken, accessToken_BitBucket, refresh_access_token_Bitbucket)
            VALUES 
            ('${email}', '${authorization}', '${data['access_token']}', '${data['refresh_token']}')`;
            
            connect.query(queryString, (err, res) => {
                
                if(err){
                    console.log(err);
                    return;
                }
            });
        });
    });
}