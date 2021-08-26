export default async function isAccessBitbucketActual(accessToken){

    let url = 'https://api.bitbucket.org/2.0/workspaces';

    const res = await fetch(url, {

        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    
    return res.status;
}