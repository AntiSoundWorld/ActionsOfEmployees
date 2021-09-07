import fetch from 'node-fetch'

export default async function getCreatemeta(accessToken, accessId){

    const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}/rest/api/2/issue/createmeta`, {

        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await res.json();

    const datas = data.projects.map( data => {

        return {
            id: data.id,
            key: data.key,
            name: data.name,
            avatarUrl: data.avatarUrls['32x32']
        }
    });

    return datas;
}
