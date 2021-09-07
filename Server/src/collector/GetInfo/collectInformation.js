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

    updateActionsOfEmployees(null, basicToken);

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

function initializeMacketForRender(infoUsersJira, infoBitBucket, infoConfluence){

    let usersComments = getIdenticalAndUnIndenticalUsers(infoUsersJira.users, infoUsersJira.projects);
  
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

        user.datas = [];

        let userMacket = getMacketForRender();
      
        usersComments.existingUsers.map(currentUser => {

            if(user.user.accountId == currentUser.user.accountId){

                const numOfComments = countActionsbyUser(currentUser, 'commentsJira');

                userMacket.comments.numOfComments = numOfComments;
                userMacket.comments.projects = currentUser.projects

                userMacket.numOfActions = userMacket.numOfActions + numOfComments;
                user.datas = userMacket;
            }
        });

        usersCommits.existingUsers.map(currentUser => {

            if(user.user.accountId === currentUser.user.accountId){
                
                const numOfCommits =  countActionsbyUser(currentUser, 'commits')

                userMacket.commits.numOfCommits = numOfCommits;

                userMacket.commits.workspaces = currentUser.workspaces

                userMacket.numOfActions = userMacket.numOfActions + numOfCommits;
            }
        });

        usersPullRequests.existingUsers.map(currentUser => {

            if(user.user.accountId === currentUser.user.accountId){

                const numOfpullRequests =  countActionsbyUser(currentUser, 'pullRequests');

                userMacket.pullRequests.numOfpullRequests =numOfpullRequests

                userMacket.pullRequests.workspaces = currentUser.workspaces;
                
                userMacket.numOfActions = userMacket.numOfActions + numOfpullRequests;

                user.datas = userMacket;

            }
        });

        usersCommentsOfCommits.existingUsers.map(currentUser => {

            if(user.user.accountId === currentUser.user.accountId){

                const numCommentsOfCommits = countActionsbyUser(currentUser, 'commentsOfCommits');

                userMacket.commentsOfCommits.numCommentsOfCommits = numCommentsOfCommits;

                userMacket.commentsOfCommits.workspaces = currentUser.workspaces;

                userMacket.numOfActions = userMacket.numOfActions + numCommentsOfCommits;
            }

        });

        usersCommentsOfPullRequests.existingUsers.map(currentUser => {
            
            if(user.user.accountId === currentUser.user.accountId){
                
                const numCommentsOfPullRequests = countActionsbyUser(currentUser, 'commentsOfPullRequests');

                userMacket.commentsOfPullRequests.numCommentsOfPullRequests = numCommentsOfPullRequests;

                userMacket.commentsOfPullRequests.workspaces = currentUser.workspaces;

                userMacket.numOfActions = userMacket.numOfActions + numCommentsOfPullRequests;

            }
        });

        usersEditPage.existingUsers.map(currentUser => {
            
            if(user.user.accountId === currentUser.user.accountId){
                
                const numOfEditsPages = countActionsbyUser(currentUser, 'editsPages');

                userMacket.editsPages.numOfEditsPages =  numOfEditsPages;

                userMacket.editsPages.spaces = currentUser.spaces;

                userMacket.numOfActions = userMacket.numOfActions + numOfEditsPages;

            }
        });

        usersCommentsPage.existingUsers.map(currentUser => {
            
            if(user.user.accountId === currentUser.user.accountId){

                const numOfCommentsPages = countActionsbyUser(currentUser, 'commentsPages');

                userMacket.commentsPages.numOfCommentsPages = numOfCommentsPages;

                userMacket.commentsPages.spaces = currentUser.spaces;

                userMacket.numOfActions = userMacket.numOfActions + numOfCommentsPages;
            }
        });

        usersEditsBlogs.existingUsers.map(currentUser => {
            
            if(user.user.accountId === currentUser.user.accountId){

                const numOfEditsBlogPosts = countActionsbyUser(currentUser, 'editsBlogs');
                
                userMacket.editsBlogPosts.numOfEditsBlogPosts = numOfEditsBlogPosts;

                userMacket.editsBlogPosts.spaces = currentUser.spaces;

                userMacket.numOfActions = userMacket.numOfActions + numOfEditsBlogPosts;

            }
        });
                
        usersCommentsBlogs.existingUsers.map(currentUser => {

            if(user.user.accountId === currentUser.user.accountId){

                const numOfCommentsBlogPosts = countActionsbyUser(currentUser, 'commentsBlogs');

                userMacket.commentsBlogPosts.numOfCommentsBlogPosts = numOfCommentsBlogPosts;

                userMacket.commentsBlogPosts.spaces = currentUser.spaces;

                userMacket.numOfActions = userMacket.numOfActions + numOfCommentsBlogPosts;
            }
        });

        user.datas = userMacket;
        macketForRender.push(JSON.parse(JSON.stringify(user)));
    });

    return macketForRender;
}

export default collectInformation;