import { jiraMacketProjectKeyInfo, jiraProjectKeyData } from '../Makcets/getMacketForJira.js';
import { userLabel } from '../Makcets/getMacketInfo.js'
import requestsToJira from '../Requests/requestsToJira.js'
import {getUsers, isAccountIdExistInList } from './Tools/tools.js';
import substr from "substr-word"

async function getInfoFromJira(dates, jiraAccess, jiraUrl, accessId) {
    
    const jiraResponses = await requestsToJira(jiraAccess, jiraUrl, accessId);

    let usersInfo = {
        users: await getIdentityUsers(jiraResponses.users),
        projects: await getInfoFromResponses(dates, jiraResponses.projects)
    }
  
    return usersInfo;
}

export function getIdentityUsers(users){

    let  usersLabel = []
    let information = [];
    let size = '32x32';
    users.map(currentElement => {

        currentElement.datas.map(user => {
            let macketUserLabel = userLabel();
            macketUserLabel.user.accountAvatar = user.avatarUrls[size];
            macketUserLabel.user.accountName = user.displayName;
            macketUserLabel.user.accountId = user.accountId;
            macketUserLabel.user.emailAddress = user.emailAddress;
                
            information.push(macketUserLabel);
        
            if(usersLabel.length == 0){
    
                usersLabel.push(macketUserLabel)
                return;
            }
        
            if(isAccountIdExistInList(usersLabel, macketUserLabel) == false) {
        
                usersLabel.push(macketUserLabel)
            }
        });
    });

    return usersLabel;
}

async function getInfoFromResponses(dates, responses, determinant) {
     
    let macketsOfUsers = getMacketsOfUsers(responses, determinant);
    
    return countActions(dates, getUsersInformation(macketsOfUsers), macketsOfUsers, determinant);
}

function getMacketsOfUsers(responses){

    let macketsOfUsers = []
    
    responses.map(response => {
    
        response.issues.map(issue => {
     
            
            issue.comments.map(comment => {
                let initializedMacketOfUser = getInitializedMacketOfUser(response, issue, comment);

                macketsOfUsers.push(initializedMacketOfUser);
            });
            
        })
    })
    return macketsOfUsers;
}

function getUsersInformation(macketOfUsers){

    let users = getUsers(macketOfUsers);

    users.map(currentUser => {
         
         macketOfUsers.map(macketOfUser => {
              
              let isExistInfo = getIsExistInfo(currentUser, macketOfUser);

              if(isExistInfo.isAccountIdExist == true && isExistInfo.isProjectExist == false){

                    macketOfUser.projects.map(project => {
                            currentUser.projects.push(Object.assign(project));
                    });
              }
              if(isExistInfo.isAccountIdExist == true && isExistInfo.isProjectExist == true && isExistInfo.isIssueNameExist == false) {

                    let issuesOfCurrentUser = getIssuesOfUser(currentUser);
                    let issuesOfmacketOfUser = getIssuesOfUser(macketOfUser);

                    issuesOfmacketOfUser.map(currentIssueName => {
                        issuesOfCurrentUser.push(Object.assign(currentIssueName));
                    });
              }
         });
    });

    return users;
}

export function getIsExistInfo(comparedUser, soughtUser) {

    let isExistInfo = {
        isAccountIdExist: false,
        isProjectExist: false,
        isIssueNameExist: false,
    }

    soughtUser.projects.map(sougthProject => {
        sougthProject.issues.map(sougthIssueName => {

              comparedUser.projects.map(currentComparedProject => {
                   currentComparedProject.issues.map(currentComparedIssue => {

                        if(soughtUser.user.accountId == comparedUser.user.accountId){
                             isExistInfo.isAccountIdExist = true;

                            if(sougthProject.id == currentComparedProject.id){
                                isExistInfo.isProjectExist = true;

                                if(sougthIssueName.issue == currentComparedIssue.issue){
                                    isExistInfo.isIssueNameExist = true;
                                }
                            }
                        }
                   });
              });
         });
    });
    return isExistInfo;
}

function getInitializedMacketOfUser(response, issue,comment){

    
    let userLabelMacket = userLabel();
    userLabelMacket.user.accountAvatar = comment.author.avatarUrls['32x32'];
    userLabelMacket.user.accountId = comment.author.accountId;
    userLabelMacket.user.accountName = comment.author.displayName;
    userLabelMacket.user.createdDate = substr(comment.created, 10);
    userLabelMacket.projects = [];
    userLabelMacket.numOfComments = 0
    
    
    
    let projectsInfo = {
        id: response.id,
        key: response.key,
        name: response.name,
        issues:[],
        numOfComments: 0

    }
    let issueInfo = {
        issue: issue.projectKey,
        actions: [{
            numOfComments: 0
        }]
    }

    projectsInfo.issues.push(issueInfo);
    
    userLabelMacket.projects.push(projectsInfo);
    
    return userLabelMacket;
}

function getIssuesOfUser(user){

    let issues = null;

    user.projects.map(currentProject => {
        issues = currentProject.issues;
    })

    return issues;
}


function countActions(dates, users, mackets, countVar) {

    // console.log('users', users);
    // console.log('mackets', mackets);

    users.map(user => {
        
        mackets.map(currentUser => {
            if(user.user.accountId === currentUser.user.accountId ){
                
                user.projects.map(userProject => {

                    currentUser.projects.map(currentProject => {


                        if (userProject.id === currentProject.id) {

                            userProject.issues.map(userIssue => {
                                    
                                currentProject.issues.map(currentIssueName => {
                                    
                                    if(userIssue.issue === currentIssueName.issue && currentUser.user.createdDate >= dates.start && currentUser.user.createdDate <= dates.end){
                                        userIssue.actions.map(action => {
                                            
                                            action.numOfComments ++;
                                        });
                                    }
                                });

                            });
                        }
                    });
                })
            }
        })
    });
    
    return users;
}

export default getInfoFromJira;