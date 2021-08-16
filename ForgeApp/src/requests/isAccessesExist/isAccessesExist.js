import IsBitBucketAccessExist from './isBitBucketAccessExist';
import IsJiraAccessExist from './isJiraAccessExist';

export default async function IsAccessesExist(basicToken){

    const accesses = {

        isBitBucketAccessExist: await IsBitBucketAccessExist(basicToken),
        
        isJiraAccessExist:await IsJiraAccessExist(basicToken)
    }

    return accesses;
}