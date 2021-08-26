import getBitBukcetWorkspaces from './requestsToBitBucket/getBitBukcetWorkspaces.js';
import getListOfCommentsFromCommits from './requestsToBitBucket/getListOfCommentsFromCommits.js';
import getListOfRepositories from './requestsToBitBucket/getListOfRepositories.js';
import getRepositoryCommits from './requestsToBitBucket/getRepositoryCommits.js';
import getRepositoryPullRequests from './requestsToBitBucket/getRepositoryPullRequests.js';

export default async function requestsToBitBucket(accessToken) {

    const listOfWorkspacesName = await getBitBukcetWorkspaces(accessToken);
    
    const listOfRepositoriesName = await getListOfRepositories(listOfWorkspacesName, accessToken);
    
    const listOfCommits = await getRepositoryCommits(listOfRepositoriesName, accessToken);

    const infoBitBucket = {
        
        repositoryCommits: listOfCommits,

        commentsFromCommits: await getListOfCommentsFromCommits(listOfCommits, accessToken),

        repositoryPullRequests: await getRepositoryPullRequests(listOfRepositoriesName, accessToken)
    }

    return infoBitBucket;
}