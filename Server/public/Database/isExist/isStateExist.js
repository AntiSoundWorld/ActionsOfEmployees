import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
dotenv.config();

export default async function isStateExist(state){

    const connect = connectDatebase();

    const queryString = `SELECT state FROM users WHERE state='${state}'`;
    
    const [rows] = await connect.query(queryString)
    
    if (rows.length === 0) {
        return 401;
    }

    return 200;
}