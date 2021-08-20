import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateActionsOfEmployees(actionsOfEmployess, basicToken){

    const connect = connectDatebase();

    let update = `UPDATE users SET 
    actionsOfEmployees='${JSON.stringify(actionsOfEmployess)}'
    WHERE basicToken='${basicToken}'`
    
    console.log("-==============================",await connect.query(update));
}