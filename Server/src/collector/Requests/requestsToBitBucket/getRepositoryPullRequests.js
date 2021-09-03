import fetch from 'node-fetch'

export default async function getRepositoryPullRequests(listOfRepositoriesName, accessToken) {
    
    let repositoryPullRequests = [];

    await Promise.all(listOfRepositoriesName.map(async(currentElement) => {

        let url = 'https://api.bitbucket.org/2.0/repositories/' + currentElement.workspace + '/' + currentElement.repositoryNames + '/pullrequests?state=merged';

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await res.json();

        let info = {
            workspace: currentElement.workspace,
            repository: currentElement.repositoryNames,
            data: data
        }
        repositoryPullRequests.push(info);
        return data;
    }));

    return repositoryPullRequests;
}
