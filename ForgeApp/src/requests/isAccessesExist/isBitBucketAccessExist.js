import {fetch} from "@forge/api";

export default async function IsBitBucketAccessExist(basicToken){

    let isBitBucketAccessExist = false;

    const res = await fetch("https://actionsofemployees.herokuapp.com/is_bitbucket_accessToken_exist", {

        headers: {
            "Authorization": `Basic ${basicToken}`
        }
    });

    if(res.status === 200){

        isBitBucketAccessExist = true;
    }
  
    return isBitBucketAccessExist;
}