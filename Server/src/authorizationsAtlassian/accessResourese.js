import request from 'request';
import fetch from 'node-fetch'

export default async function accessResourse(access){

    let res = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
            headers:{
                'Authorization': `Bearer ${access}`,
                'Accept': 'application/json',
            }
    })

   return await res.json();
}