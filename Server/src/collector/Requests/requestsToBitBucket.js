import fetch from 'node-fetch'
import dotenv from 'dotenv'

export async function requestsToBitBucket(accessToken) {

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

export async function isAccessBitbucketActual(accessToken){

    let url = 'https://api.bitbucket.org/2.0/workspaces';

    const res = await fetch(url, {

        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    
    return res.status;
}

export const getBitBukcetWorkspaces = async(accessToken) => {

    if (Object.keys(accessToken).length == 0) {
        return;
    }

    let listOfWorkspacesName = [];

    let url = 'https://api.bitbucket.org/2.0/workspaces';

    const res = await fetch(url, {

        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await res.json();
    
    data.values.map(currentElement => {

        listOfWorkspacesName.push(currentElement.slug);

    });

    return listOfWorkspacesName
}

async function getListOfRepositories(listOfWorkspacesName, accessToken) {

    let listOfRepositoriesName = [];

    const asyncRes = await Promise.all(listOfWorkspacesName.map(async(workspace) => {
        return getListOfNamesRepositories(workspace, accessToken);
    }))

    asyncRes.map(currentElement => {
        currentElement.map(repositoryName => {

            listOfRepositoriesName.push(repositoryName);
        });
    })

    return listOfRepositoriesName
}

async function getListOfNamesRepositories(workspace, accessToken) {


    let listOfNamesRepositories = [];

    let repositoryNames = [];

    let url = 'https://api.bitbucket.org/2.0/repositories/' + workspace;

    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await res.json();

    data.values.map(currentElement => {

        listOfNamesRepositories.push({
            workspace: workspace,
            repositoryNames: currentElement.slug
        });
    });

    return listOfNamesRepositories
}

async function getRepositoryCommits(listOfRepositoriesName, accessToken) {
    let asyncRes2 = [];

    let asynRes = await Promise.all(listOfRepositoriesName.map(async(currentElement) => {
        let url = 'https://api.bitbucket.org/2.0/repositories/' + currentElement.workspace + '/' + currentElement.repositoryNames + '/commits';

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await res.json();

        let length = data.values.length;
        if (data.values[length - 1].rendered.message.raw == 'Initial commit') { // remove first commit of git ignore
            data.values.pop(0);
        };

        let info = {
            workspace: currentElement.workspace,
            data: data
        }

        asyncRes2.push(info);

        return data;
    }));

    return asyncRes2;
}

async function getRepositoryPullRequests(listOfRepositoriesName, accessToken) {
    let asyncRes2 = [];

    let asynRes = await Promise.all(listOfRepositoriesName.map(async(currentElement) => {

        let url = 'https://api.bitbucket.org/2.0/repositories/' + currentElement.workspace + '/' + currentElement.repositoryNames + '/pullrequests';

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await res.json();

        let info = {
            workspace: currentElement.workspace,
            data: data
        }
        asyncRes2.push(info);
        return data;
    }));

    return asyncRes2;
}

async function getListOfCommentsFromCommits(listOfCommits, accessToken){

    let promise = await Promise.all(listOfCommits.map(async commit => {
        
            let infos = {
                workspace: commit.workspace,
                repository: null,
                datas: []
            }

            await Promise.all(commit.data.values.map(async value => {

                infos.repository = {name: value.repository.name}

                let url = value.links.comments.href;
        
                const res = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                
                const datas =  await res.json();

                infos.datas.push(datas);
        }));

        return infos;
    }))

    return promise;
}


export default requestsToBitBucket;