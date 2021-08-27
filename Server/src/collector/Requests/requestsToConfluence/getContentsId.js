import fetch from 'node-fetch';

export async function getContentsId(accessId, accessToken, type){

    let url = `https://api.atlassian.com/ex/confluence/${accessId}/wiki/rest/api/content?status=any&type=${type}&expand=childTypes.comment`;

    const res = await fetch(url, {

        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "ContentType": "application/json"
        }
    });
    
    const datas = await res.json();
    
    const contentId = [];
    
    datas.results.forEach(data => {

        if(data.status === 'trashed'){

            return;
        }

        if(data.childTypes.comment.value === false){

            return;
        }

        contentId.push(data.id)
    });
    
    return contentId;
}
