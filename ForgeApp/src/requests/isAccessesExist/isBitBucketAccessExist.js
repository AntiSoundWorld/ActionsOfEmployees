import fetch from "node-fetch";

export default async function IsBitBucketAccessExist(basicToken){

    let isBitBucketAccessExist = false;

    const res = await fetch("https://actionsofemployees.herokuapp.com/is_bitbucket_accessToken_exist", {

        headers: {
            "Authorization": `Basic ${basicToken}`
        }
    });

    const status = await res.status();

    if(status === 200){

        isBitBucketAccessExist = true;
    }
  
    return isBitBucketAccessExist;
}