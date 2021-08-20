import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateCurrentActionsOfEmplyees(actionsOfEmployess, basicToken){

    const connect = connectDatebase();

    let update = `UPDATE users SET 
    currentActionsOfEmployees='${JSON.stringify(actionsOfEmployess)}'
    WHERE basicToken='${basicToken}'`
    
    await connect.query(update);
}