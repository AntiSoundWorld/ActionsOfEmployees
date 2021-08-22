import fetch from 'node-fetch'
import dotenv from 'dotenv'

export async function GetCommentsOfCommits(accessToken){

    let url = 'https://api.bitbucket.org/2.0/repositories/AntiSoundWorld/tedt/commits/master';

    const res = await fetch(url, {

        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    
    console.log('GetCommentsOfCommits', await res.json());
    return res.status;
}
