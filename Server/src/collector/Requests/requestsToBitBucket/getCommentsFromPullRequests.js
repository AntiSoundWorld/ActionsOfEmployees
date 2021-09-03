import fetch from 'node-fetch'

export default async function getCommentsFromPullRequests(listOfRepositoriesName, accessToken){


  
    const commentsFromPullRequests = await Promise.all(listOfRepositoriesName.map(async repository => {
        
        let infos = {
            workspace: repository.workspace,
            repository: null,
            datas: []
        }
        await Promise.all(repository.data.values.map(async pullrequest => {

            infos.repository = {name: repository.repository}

            const url = `https://api.bitbucket.org/2.0/repositories/${repository.workspace}/${repository.repository}/pullrequests/${pullrequest.id}/comments`

            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            const datas =  await res.json();
            
            infos.datas.push(datas);
       }))

       return infos;
    }));

   return commentsFromPullRequests;
}