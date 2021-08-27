import fetch from 'node-fetch'

export async function getComments(accessId, accessToken, id, type){

    let url = `https://api.atlassian.com/ex/confluence/${accessId}/wiki/rest/api/content/${id}/child/comment?expand=history,space`

    const res = await fetch(url, {

        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "ContentType": "application/json"
        }
    });
    
    const datas = await res.json();

    const contentsInfo = datas.results.map(data => {

        return {
            user:{
                accountId: data.history.createdBy.accountId,
                email:  data.history.createdBy.email,
                userName:  data.history.createdBy.displayName,
            },
            
            datas: {
                space: data.space.name,
                created_on:  data.history.createdDate,
                comment: data.title,
            }
        
        }
    })

    return contentsInfo;
}
