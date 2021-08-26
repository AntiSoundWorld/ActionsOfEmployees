import fetch from 'node-fetch'

export default async function getRepositoryCommits(listOfRepositoriesName, accessToken) {

    let repositoryCommits = [];

    await Promise.all(listOfRepositoriesName.map(async(currentElement) => {
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

        repositoryCommits.push(info);

        return data;
    }));

    return repositoryCommits;
}
