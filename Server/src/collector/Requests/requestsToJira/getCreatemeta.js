import fetch from 'node-fetch'

export default async function getCreatemeta(accessToken, accessId){

    const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}/rest/api/2/issue/createmeta`, {

        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await res.json();  
    
    return data;
}
