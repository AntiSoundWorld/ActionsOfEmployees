import fetch from 'node-fetch'

export async function requestsToJira(accessToken, jiraUrl) {

    console.log('===================================', accessToken, jiraUrl);
    let createmeta = await getCreatemeta(accessToken, jiraUrl); // createmeta.projects

    const jiraResponses = {

        users: await getAllUsers(accessToken, jiraUrl, createmeta),

        comments: await Promise.all(createmeta.projects.map(project => {
            return getDatasComments(accessToken, jiraUrl, project.key);
        }))
    }

    console.log('===================================', jiraResponses.users, jiraResponses.comments);
    
    return jiraResponses
}

export async function getAllUsers(accessToken, jiraUrl, createmeta){

    return await Promise.all(createmeta.projects.map(project => {

        return getUsers(accessToken, jiraUrl, project.key);

    }))
}

export async function getCreatemeta(accessToken, jiraUrl){
    

    const res = await fetch(`${jiraUrl}/rest/api/2/issue/createmeta`, {

        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    });

    console.log('res ===================================', res);
    const data = await res.json();  
    
    return data;
}


const getUsers = async (accessToken, jiraUrl, key) => {

    let usersInfo = {
        projectName: key,
        datas: null
    }

    let url = '/rest/api/2/user/assignable/search?project=' + key;

    const res = await fetch(`${jiraUrl}${url}`, {
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
    
    console.log(res);
    const data = await res.json();

}

const getDatasComments = async (accessToken, jiraUrl, key) => {

    let status = 404;

    let projectInfo = {
        projectName: key,
        datas: []
    }
    
    let i = 1;

    while (true) {
        
        let url = '/rest/api/3/issue/' + key + '-' + i + '/comment';
        
        const res = await fetch(`${jiraUrl}${url}`, {
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

export default requestsToJira;