import fetch from 'node-fetch'

export default async function getListOfCommentsFromCommits(listOfCommits, accessToken){

    let listOfCommentsFromCommits = await Promise.all(listOfCommits.map(async commit => {
        
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

    return listOfCommentsFromCommits;
}