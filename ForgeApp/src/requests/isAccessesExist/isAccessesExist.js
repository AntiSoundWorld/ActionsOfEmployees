import IsBitBucketAccessExist from './isBitBucketAccessExist';
import IsConfluenceAccessExist from './isConfluenceAccessExist';
import IsJiraAccessExist from './isJiraAccessExist';

export default async function GetAccesses(basicToken){
    
    const accesses = {

        isJiraAccessExist:await IsJiraAccessExist(basicToken),
        isConfluenceAccessExist: IsConfluenceAccessExist(basicToken),
        isBitBucketAccessExist: await IsBitBucketAccessExist(basicToken),
        
    }

    return accesses;
}