import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateActionsOfEmployees(actionsOfEmployees, basicToken){

    const connect = connectDatebase();

    let update = `UPDATE users SET 
    actionsOfEmployees='${JSON.stringify(actionsOfEmployees)}'
    WHERE basicToken='${basicToken}'`
    
    console.log(`===================Updated ${actionsOfEmployees}======================`)
    await connect.query(update);
}