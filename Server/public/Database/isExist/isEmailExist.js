import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function isEmailExist(email){
    
    const connect = connectDatebase();

    const queryString = `SELECT email FROM users WHERE email='${email}'`;
    
    
    try{
        const [rows] = await connect.query(queryString)
        
        if (rows.length === 0) {
            return 401;
        }
        return 200;
    }
    catch(err){
        console.log(err)
        return 500;
    }
    

}