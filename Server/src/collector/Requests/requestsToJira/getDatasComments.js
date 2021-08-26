import fetch from 'node-fetch';

export default async function getDatasComments(accessToken, key, accessId){

    let status = 404;

    let projectInfo = {
        projectName: key,
        datas: []
    }
    
    let i = 1;

    while (true) {
        
        let url = '/rest/api/3/issue/' + key + '-' + i + '/comment';
        
        const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}${url}`, {
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await res.json();


        if(res.status == status) {
            break;
        }

        let info = {
            projectKey: key + '-' + i,
            datas: data
        }
        
        projectInfo.datas.push(info);
        
        i++;

    }

    return projectInfo;
}
