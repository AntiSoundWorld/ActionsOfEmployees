import fetch from 'node-fetch'

export async function requestsToJira(accessToken, accessId) {

    let createmeta = await getCreatemeta(accessToken, accessId); // createmeta.projects

    const jiraResponses = {

        users: await getAllUsers(accessToken, createmeta, accessId),

        comments: await Promise.all(createmeta.projects.map(project => {
            return getDatasComments(accessToken, project.key, accessId);
        }))
    }

    return jiraResponses
}

export async function getAllUsers(accessToken, createmeta, accessId){

    return await Promise.all(createmeta.projects.map(project => {

        return getUsers(accessToken, project.key, accessId);

    }))
}

export async function getCreatemeta(accessToken, accessId){
    

    const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}/rest/api/2/issue/createmeta`, {

        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    });

    console.log("createmeta2", res);

    const data = await res.json();  
    
    return data;
}


const getUsers = async (accessToken, key, accessId) => {

    let usersInfo = {
        projectName: key,
        datas: null
    }

    let url = '/rest/api/2/user/assignable/search?project=' + key;

    const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}${url}`, {
        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await res.json();

    usersInfo.datas = data;

    return usersInfo;
}

const getSprint = async () => {
    let url = 'https://api.bitbucket.org/2.0/workspaces';
    const res = await api.asUser().requestJira(url, {
        headers:{
            'origin': 'https://api.bitbucket.org'
        }
    });
    
    const data = await res.json();

}

const getDatasComments = async (accessToken, key, accessId) => {

    let status = 404;

    let projectInfo = {
        projectName: key,
        datas: []
    }
    
    let i = 1;

    while (true) {
        
        let url = '/rest/api/3/issue/' + key + '-' + i + '/comment';
        
        const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}${url}`, {
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await res.json();


        if(res.status == status) {
            break;
        }

        let info = {
            projectKey: key + '-' + i,
            datas: data
        }
        
        projectInfo.datas.push(info);
        
        i++;

    }

    return projectInfo;
}

async function GetBoards(accessId, accessToken){

    const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}/rest/agile/1.0/board`, {

        headers:{
            "Authorization": `Bearer ${accessToken}`
        }
    })

    console.log("borders", res);
}

export default requestsToJira;