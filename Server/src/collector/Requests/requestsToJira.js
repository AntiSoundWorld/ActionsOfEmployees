import fetch from 'node-fetch'
import getUsers from './requestsToJira/getUsers.js';
import getCreatemeta from './requestsToJira/getCreatemeta.js';
import getDatasComments from './requestsToJira/getDatasComments.js';

export async function requestsToJira(accessToken, jiraUrl, accessId) {

    let projects = await getCreatemeta(accessToken, accessId); // createmeta.projects


    await Promise.all(projects.map(async project => {

        project.issues = await getDatasComments(accessToken, project.key, accessId);
    }))
    const jiraResponses = {
        
        users: await Promise.all(projects.map(project => {
            return getUsers(accessToken, project.key, accessId);
        })),

        projects
    }
    
    return jiraResponses;
}

export default requestsToJira;