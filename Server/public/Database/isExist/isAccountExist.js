import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
dotenv.config();

export default async function isBasicTokenExist(basicToken){

    const connect = connectDatebase();

    const queryString = `SELECT basicToken FROM users WHERE basicToken='${basicToken}'`;
    
    try{
        const [textRow] = await connect.query(queryString);
        
        if (textRow.length === 0) {
            return 404;
        }
        
        return 200;
    }
    catch(err){
        return 500;
    }
}