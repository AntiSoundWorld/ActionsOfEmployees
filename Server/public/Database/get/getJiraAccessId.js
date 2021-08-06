import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
dotenv.config();

export default async function getDomen(basicToken){

    const connect = connectDatebase();

    let status = isBasicTokenExist(basicToken);

    if (status === 404) {
        return
    }

    let getAccessId = `SELECT access_id_Jira FROM users WHERE basicToken='${basicToken}'`;

    let [rows] = await connect.query(getAccessId);

    return JSON.parse(JSON.stringify(rows[0].access_id_Jira));
}