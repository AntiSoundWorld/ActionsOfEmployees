import fetch from 'node-fetch'
import getUsers from './requestsToJira/getUsers.js';
import getCreatemeta from './requestsToJira/getCreatemeta.js';
import getDatasComments from './requestsToJira/getDatasComments.js';

export async function requestsToJira(accessToken, jiraUrl, accessId) {

    let createmeta = await getCreatemeta(accessToken, accessId); // createmeta.projects

    const jiraResponses = {

        users: await Promise.all(createmeta.projects.map(project => {

            return getUsers(accessToken, project.key, accessId);
        })),

        comments: await Promise.all(createmeta.projects.map(project => {

            return getDatasComments(accessToken, project.key, accessId);
        }))
    }
    
    return jiraResponses;
}

export default requestsToJira;