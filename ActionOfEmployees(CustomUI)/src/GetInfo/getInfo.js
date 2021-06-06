import GetMacketForRender, { info } from '../Makcets/getMacketForRender';
import getInfoFromBitBucket from './getInfoFromBitBucket';
import getInfoFromJira from './getInfoFromJira';
import { getIdenticalAndUnIndenticalUsers, countActionsbyUser } from './Tools/tools'

async function getInfo(payload){

    let infoBitBucket = await getInfoFromBitBucket(payload.dates, payload.accessToken);

    let infoUsersJira = await getInfoFromJira(payload.dates);
    
    return initializeMacketForRender(infoUsersJira, infoBitBucket);
}

function initializeMacketForRender(infoUsersJira, infoBitBucket){


    let usersComments = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoUsersJira.comments);

    let usersCommits = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoBitBucket.infoCommits);

    let usersPullRequests = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoBitBucket.infoPullRequests);
    
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

        macketForRender.push(JSON.parse(JSON.stringify(userMacket)));
    });

    return macketForRender;
}

export default getInfo;