import request from 'request';
import fetch from 'node-fetch'
import updateJiraAccessId from '../../public/Database/set/updateJiraAccessId.js';
import updateUrlJira from '../../public/Database/set/updateUrlJira.js';

export default async function accessResourse(accessToken){

    let res = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
            }
    })

    console.log('=====================================  ', res);
    let datas = await res.json();

    await updateJiraAccessId(datas, accessToken);

    await updateUrlJira(datas, accessToken);

    return datas[0].id;
}