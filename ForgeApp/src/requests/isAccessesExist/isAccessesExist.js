import IsBitBucketAccessExist from './isBitBucketAccessExist';
import IsJiraAccessExist from './isJiraAccessExist';

export default async function IsAccessesExist(basicToken){

    let isAccessesExist = false;

    const isBitBucketAccessExist = await IsBitBucketAccessExist(basicToken);

    const isJiraAccessExist = await IsJiraAccessExist(basicToken); 

    if(isBitBucketAccessExist && isJiraAccessExist){
        
        isAccessesExist = true;
    }

    return isAccessesExist;
}