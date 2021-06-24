import connectDatebase from "../connectToDatebase.js";
import btoa from 'btoa'

import dotenv from 'dotenv';
dotenv.config();

export default async function setState(resposne, state, email, password){
    const connect = connectDatebase();

    const queryString = `SELECT email FROM users WHERE email='${email}'`;

    connect.query(queryString, (err, res) => {
        
        if(err){
            console.log(err);
        }

        if(res.length !== 0){
            console.log('setCodeOfUserToDatebase - state exist');
            return;
        }

        let basicToken = "Basic " + btoa(email + ":" + password);

        const query = `INSERT INTO users (state, email, password, basicToken) VALUES ('${state}', '${email}', '${password}', '${basicToken}')`;

        connect.query(query, (err, res) => {
        
            if(err){
                console.log(err);
            }
        })
    })
}