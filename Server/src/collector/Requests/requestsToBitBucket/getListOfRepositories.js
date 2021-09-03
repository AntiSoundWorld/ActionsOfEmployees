import fetch from 'node-fetch'

export default async function getListOfRepositories(listOfWorkspacesName, accessToken) {

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
