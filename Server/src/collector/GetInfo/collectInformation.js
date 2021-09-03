import getBitBucketAccessToken from '../../../public/Database/get/getBitbucketAccessToken.js';
import getConfluenceAccessToken from '../../../public/Database/get/getConfluenceAccessToken.js';
import getJiraAccessToken from '../../../public/Database/get/getJiraAccessToken.js';
import getJiraUrl from '../../../public/Database/get/getJiraUrl.js';
import updateActionsOfEmployees from '../../../public/Database/set/updateActionsOfEmployees.js';
import accessResourse from '../../authorizationsAtlassian/accessResourese.js';
import getMacketForRender from '../Makcets/getMacketForRender.js';
import getInfoFromBitBucket from './getInfoFromBitBucket.js';
import GetInfoFromConfluence from './getInfoFromConfluence.js';
import getInfoFromJira from './getInfoFromJira.js';

import { getIdenticalAndUnIndenticalUsers, countActionsbyUser } from './Tools/tools.js'

async function collectInformation(dates, basicToken){

    try{
             
        const bitbcuketAccess = await getBitBucketAccessToken(basicToken);
    
        const jiraAccess = await getJiraAccessToken(basicToken);
        
        const jiraUrl = await getJiraUrl(basicToken);

        const accessId = await accessResourse(jiraAccess);

        const confluenceAccess = await getConfluenceAccessToken(basicToken);

        const infoBitBucket = await getInfoFromBitBucket(dates, bitbcuketAccess);
        
        const infoUsersJira = await getInfoFromJira(dates, jiraAccess, jiraUrl, accessId);
        
        const infoConfluence = await GetInfoFromConfluence(accessId, confluenceAccess, dates)

        const actionsOfEmployees = initializeMacketForRender(infoUsersJira, infoBitBucket, infoConfluence);
        
        updateActionsOfEmployees(actionsOfEmployees, basicToken);
    }
    catch(err){
        console.log(err);
    }

}

function initializeMacketForRender(infoUsersJira, infoBitBucket, infoConfluence){

    let usersComments = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoUsersJira.comments);

    let usersCommits = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoBitBucket.infoCommits);

    let usersPullRequests = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoBitBucket.infoPullRequests);

    let usersCommentsOfCommits = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoBitBucket.infoCommentsOfcommits);

    let usersCommentsOfPullRequests = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoBitBucket.infCommentsPullRequests);

    let usersEditPage =  getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoConfluence.infoPages.edits);
    
    let usersCommentsPage =  getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoConfluence.infoPages.comments);
    
    let usersEditsBlogs =  getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoConfluence.infoBlogs.edits);
   
    let usersCommentsBlogs = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoConfluence.infoBlogs.comments);


    let macketForRender = [];
    
    infoUsersJira.users.map(user => {

        let userMacket = getMacketForRender();
        
        userMacket.accountAvatar = user.user.accountAvatar;
        userMacket.accountId = user.user.accountId;
        userMacket.accountName = user.user.accountName;

        usersComments.existingUsers.map(currentUser => {

            if(user.user.accountId == currentUser.user.accountId){

                userMacket.numOfComments = countActionsbyUser(currentUser, 'commentsJira');
            }
        });

        usersCommits.existingUsers.map(currentUser => {

            if(user.user.accountId === currentUser.user.accountId){

                userMacket.numOfCommits = countActionsbyUser(currentUser, 'commits');
            }
        });

        usersPullRequests.existingUsers.map(currentUser => {

            if(user.user.accountId === currentUser.user.accountId){

                userMacket.numOfpullRequests = countActionsbyUser(currentUser, 'pullRequests');
            }

        });

        usersCommentsOfCommits.existingUsers.map(currentUser => {

            if(user.user.accountId === currentUser.user.accountId){

                userMacket.numCommentsOfCommits = countActionsbyUser(currentUser, 'commentsOfCommits');
            }

        });

        usersCommentsOfPullRequests.existingUsers.map(currentUser => {
            
            if(user.user.accountId === currentUser.user.accountId){

                userMacket.numCommentsOfPullRequests = countActionsbyUser(currentUser, 'commentsOfPullRequests');
            }
        });

        usersEditPage.existingUsers.map(currentUser => {
            
            if(user.user.accountId === currentUser.user.accountId){

                userMacket.numOfEditsPages = countActionsbyUser(currentUser, 'editsPages');
            }
        });

        usersCommentsPage.existingUsers.map(currentUser => {
            
            if(user.user.accountId === currentUser.user.accountId){

                userMacket.numOfCommentsPages = countActionsbyUser(currentUser, 'commentsPages');
            }
        });

        usersEditsBlogs.existingUsers.map(currentUser => {
            
            if(user.user.accountId === currentUser.user.accountId){
            
                userMacket.numOfEditsBlogPosts = countActionsbyUser(currentUser, 'editsBlogs');
            }
        });
                
        usersCommentsBlogs.existingUsers.map(currentUser => {

            if(user.user.accountId === currentUser.user.accountId){

                userMacket.numOfCommentsBlogPosts = countActionsbyUser(currentUser, 'commentsBlogs');
            }

        });

        macketForRender.push(JSON.parse(JSON.stringify(userMacket)));
    });

    return macketForRender;
}

export default collectInformation;