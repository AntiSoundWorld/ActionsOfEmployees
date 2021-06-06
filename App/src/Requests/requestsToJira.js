import api from '@forge/api'

export async function requestsToJira() {

    let createmeta = await getCreatemeta(); // createmeta.projects

    const jiraResponses = {

        users: await getAllUsers(createmeta),

        comments: await Promise.all(createmeta.projects.map(project => {
            return getDatasComments(project.key);
        }))
    }
    
    return jiraResponses
}

export async function getAllUsers(createmeta){

    return await Promise.all(createmeta.projects.map(project => {

        return getUsers(project.key);

    }))
}

export async function getCreatemeta (){
    
    const res = await api.asApp().requestJira(`/rest/api/2/issue/createmeta`);
    const data = await res.json();  
    
    return data;
}


const getUsers = async (key) => {

    let usersInfo = {
        projectName: key,
        datas: null
    }

    let url = '/rest/api/2/user/assignable/search?project=' + key;

    const res = await api.asApp().requestJira(url);

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

const getDatasComments = async (key) => {
    
    let status = 404;

    let projectInfo = {
        projectName: key,
        datas: []
    }
    
    let i = 1;

    while (true) {
        
        let url = '/rest/api/3/issue/' + key + '-' + i + '/comment';
    
        const res = await api.asApp().requestJira(url);
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