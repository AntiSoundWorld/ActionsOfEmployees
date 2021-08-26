import fetch from 'node-fetch';

export default async function getBitBukcetWorkspaces(accessToken){

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