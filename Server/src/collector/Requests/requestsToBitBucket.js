import getBitBukcetWorkspaces from './requestsToBitBucket/getBitBukcetWorkspaces.js';
import getCommentsFromPullRequests from './requestsToBitBucket/getCommentsFromPullRequests.js';
import getListOfCommentsFromCommits from './requestsToBitBucket/getListOfCommentsFromCommits.js';
import getListOfRepositories from './requestsToBitBucket/getListOfRepositories.js';
import getRepositoryCommits from './requestsToBitBucket/getRepositoryCommits.js';
import getRepositoryPullRequests from './requestsToBitBucket/getRepositoryPullRequests.js';

export default async function requestsToBitBucket(accessToken) {

    const listOfWorkspacesName = await getBitBukcetWorkspaces(accessToken);
    
    const listOfRepositoriesName = await getListOfRepositories(listOfWorkspacesName, accessToken);
    
    const repositoryCommits = await getRepositoryCommits(listOfRepositoriesName, accessToken);

    const repositoryPullRequests =  await getRepositoryPullRequests(listOfRepositoriesName, accessToken)
    
    const commentsFromPullRequests = await getCommentsFromPullRequests(repositoryPullRequests, accessToken)

    const commentsFromCommits = await getListOfCommentsFromCommits(repositoryCommits, accessToken);

    const infoBitBucket = {
        
        repositoryCommits,

        commentsFromCommits,

        repositoryPullRequests,

        commentsFromPullRequests
    }

    return infoBitBucket;
}