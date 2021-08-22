import getBitBucketAccessToken from '../../../public/Database/get/getBitbucketAccessToken.js';
import getJiraAccessToken from '../../../public/Database/get/getJiraAccessToken.js';
import getJiraUrl from '../../../public/Database/get/getJiraUrl.js';
import updateActionsOfEmployees from '../../../public/Database/set/updateActionsOfEmployees.js';
import accessResourse from '../../authorizationsAtlassian/accessResourese.js';
import GetMacketForRender, { info } from '../Makcets/getMacketForRender.js';
import { GetCommentsOfCommits } from '../Requests/requestsTest/requestsTest.js';
import getInfoFromBitBucket from './getInfoFromBitBucket.js';
import getInfoFromJira from './getInfoFromJira.js';
import { getIdenticalAndUnIndenticalUsers, countActionsbyUser } from './Tools/tools.js'

async function collectInformation(dates, basicToken){

    try{
        
        const bitbcuketAccess = await getBitBucketAccessToken(basicToken);
    
        const jiraAccess = await getJiraAccessToken(basicToken);
        
        const jiraUrl = await getJiraUrl(basicToken);

        const accessId = await accessResourse(jiraAccess);

        const infoBitBucket = await getInfoFromBitBucket(dates, bitbcuketAccess);
        
        const infoUsersJira = await getInfoFromJira(dates, jiraAccess, jiraUrl, accessId);
        
        const actionsOfEmployees = initializeMacketForRender(infoUsersJira, infoBitBucket);
        
        updateActionsOfEmployees(actionsOfEmployees, basicToken);
    }
    catch(err){
        console.log(err);
    }

}

function initializeMacketForRender(infoUsersJira, infoBitBucket){

    let usersComments = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoUsersJira.comments);

    let usersCommits = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoBitBucket.infoCommits);

    let usersPullRequests = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoBitBucket.infoPullRequests);

    let usersCommentsOfCommits = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoBitBucket.infoCommentsOfcommits);

    let macketForRender = [];
    
    infoUsersJira.users.map(user => {

        let userMacket = info();
        
        userMacket.accountAvatar = user.user.accountAvatar;
        userMacket.accountId = user.user.accountId;
        userMacket.accountName = user.user.accountName;

        usersComments.existingUsers.map(currentUser => {

            if(user.user.accountId == currentUser.user.accountId){

                userMacket.numOfComments = countActionsbyUser(currentUser, 'comments');
            }
        });

        usersCommits.existingUsers.map(currentUser => {

            if(user.user.accountId == currentUser.user.accountId){

                userMacket.numOfCommits = countActionsbyUser(currentUser, 'commits');
            }
        });

        usersPullRequests.existingUsers.map(currentUser => {

            if(user.user.accountId == currentUser.user.accountId){

                userMacket.numOfpullRequests = countActionsbyUser(currentUser, 'pullRequests');
            }

        });

        usersCommentsOfCommits.existingUsers.map(currentUser => {

            if(user.user.accountId == currentUser.user.accountId){

                userMacket.numCommentsOfCommits = countActionsbyUser(currentUser, 'commentsOfCommits');
            }

        });
        macketForRender.push(JSON.parse(JSON.stringify(userMacket)));
    });

    return macketForRender;
}

export default collectInformation;