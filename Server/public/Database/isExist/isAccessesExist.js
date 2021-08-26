import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from './isAccountExist.js';
dotenv.config();

export default async function isAccessesExist(basicToken){

    const connect = connectDatebase();

    let status = await isBasicTokenExist(basicToken);
    
    if (status === 401) {
        
        return status;
    }

    const accesses = {

        isJiraAccessExist: true,
        isConfluenceAccessExist: true,
        isBitBucketAccessExist: true,
        
    }

    let getAccessTokenJira = `SELECT accessToken_Confluence, accessToken_BitBucket, accessToken_Jira FROM users WHERE basicToken='${basicToken}'`;
    
    
    try{
        let[accessTokenRows] = await connect.query(getAccessTokenJira);

        console.log('===============================',accessTokenRows);
        const accessToken = JSON.parse(JSON.stringify(accessTokenRows));
        
        if(accessToken[0].accessToken_Confluence === null || accessToken[0].accessToken_Confluence === 'undefined'){
        
            accesses.isConfluenceAccessExist = false;
        }

        if(accessToken[0].accessToken_BitBucket === null || accessToken[0].accessToken_BitBucket === 'undefined'){
        
            accesses.isBitBucketAccessExist = false;
        }


        if(accessToken[0].accessToken_Jira === null || accessToken[0].accessToken_Jira === 'undefined'){
        
            accesses.isJiraAccessExist = false;
        }


    }
    catch(err){
        console.log(err);
    }

    console.log(accesses)
    return accesses;
}
