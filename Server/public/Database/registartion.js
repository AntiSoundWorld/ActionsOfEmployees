import dotenv from 'dotenv';
import connectDatebase from './connectToDatebase.js';
import isEmailExist from './isExist/isEmailExist.js';
import btoa from 'btoa'
dotenv.config();

export default async function registartion(state, email, password){

    const connect = connectDatebase();

    const status = await isEmailExist(email);    

    if(status === 200){
        
        return status;
    }

    let basicToken = "Basic " + btoa(email + ":" + password);

    const query = `INSERT INTO users (state, email, password, basicToken) VALUES ('${state}', '${email}', '${password}', '${basicToken}')`;

    await connect.query(query);

    return 201;
}