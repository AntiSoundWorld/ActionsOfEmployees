import fetch from 'node-fetch'

export default async function getContentsMainInfo(accessId, accessToken, type){

    let url = `https://api.atlassian.com/ex/confluence/${accessId}/wiki/rest/api/content?type=${type}&status=any&expand=space`

    const res = await fetch(url, {

        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "ContentType": "application/json"
        }
    });
    
    const datas = await res.json();

    const contentsInfo = datas.results.map(data => {
        
        if (data.status === "trashed") {
            return {id:"trashed"};
        }
  
        return {
            type: type,
            id: data.id,
            spaceId:data.space.id,
            space:data.space.name,
            spaceKey: data.space.key,
            edits: [],
            comments: []
        }
    })


    return contentsInfo;
}
