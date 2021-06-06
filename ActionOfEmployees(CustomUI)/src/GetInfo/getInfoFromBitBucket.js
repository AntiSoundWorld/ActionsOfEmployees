import { userLabel } from "../Makcets/getMacketInfo";
import RequestsToBitBucket from "../Requests/requestsToBitBucket";
import { getIsExistInfo, isAccountIdExistInList } from "./Tools/tools";
import substr from "substr-word"

async function getInfoFromBitBucket(dates, accessToken){

     const bitbucketResponse = await RequestsToBitBucket(accessToken);

     const infoBitBucket = {
          
          infoCommits : await getInfoFromResponses(dates, bitbucketResponse.repositoryCommits, 'commits'),
          infoPullRequests: await getInfoFromResponses(dates, bitbucketResponse.repositoryPullRequests, 'pullRequests')
     }
     
     return infoBitBucket;
}

async function getInfoFromResponses(dates, responses, determinant) {
     
     let macketsOfUsers = getMacketsOfUsers(responses, determinant);
     
     return  countActions(dates, getUsersInformation(macketsOfUsers), macketsOfUsers, determinant);
}

function getMacketsOfUsers(responses, determinant){

     let macketsOfUsers = []

     responses.map(response => {
          
          response.data.values.map(value => {

               let initializedMacketOfUser = getInitializedMacketOfUser(response, value, determinant);
                
               macketsOfUsers.push(initializedMacketOfUser);
          })
     });

     return macketsOfUsers;
}

function getUsersInformation(macketOfUsers){

     let users = getUsers(macketOfUsers);

     users.map(currentUser => {
          
          macketOfUsers.map(macketOfUser => {
               
               let isExistInfo = getIsExistInfo(currentUser, macketOfUser);

               if(isExistInfo.isAccountIdExist == true && isExistInfo.isWorkspaceExist == false){
          
                    macketOfUser.workspaces.map(workspace => {
                         currentUser.workspaces.push(Object.assign(workspace));
                    });
               }
               
               if(isExistInfo.isAccountIdExist == true && isExistInfo.isWorkspaceExist == true && isExistInfo.isRepositoryNameExist == false) {
                    
                    let repositoriesOfCurrentUser = getRepositoriesOfUser(currentUser);
                    let repositoriesOfmacketOfUser = getRepositoriesOfUser(macketOfUser);
                    
                    repositoriesOfmacketOfUser.map(currentRepositoryName => {
                         repositoriesOfCurrentUser.push(Object.assign(currentRepositoryName));
                    });
               }
          });
     });

     return users;
}

function getUsers(macketOfUsers){

     let users = [];

     macketOfUsers.map(macketOfUser => {
          
          if(isAccountIdExistInList(users, macketOfUser) == false){

               users.push(JSON.parse(JSON.stringify(macketOfUser)));

               return;
          }
     });

     return users;
}

function getInitializedMacketOfUser(response, value, determinant){

     let pathToUserInfo = null;
     let pathToRpositoryInfo = null;
     let pathToCreatedDate = null
     let num = null;

     if(determinant == 'commits'){
          pathToUserInfo = value.author.user;
          pathToRpositoryInfo = value;
          pathToCreatedDate = value.date;

          num = {
               numOfCommits: 0
          }

     }

     if(determinant == 'pullRequests'){
          pathToUserInfo = value.author;
          pathToRpositoryInfo = value.source;
          pathToCreatedDate = value.created_on
          num = {
               numOfPullRequests: 0
          }
     }

     let userLabelMacket = userLabel();

     userLabelMacket.user.accountId = pathToUserInfo.account_id;
     userLabelMacket.user.accountName = pathToUserInfo.display_name;
     userLabelMacket.user.createdDate = substr(pathToCreatedDate, 10);
     userLabelMacket.workspaces = [];
     
     let workSpaceInfo = {
          workspaceName: response.workspace,
          repositoriesName:[]
     }
     
     let repositoryInfo = {
          repositoryName: pathToRpositoryInfo.repository.name,
          actions: []
     }

     repositoryInfo.actions.push(num);
     workSpaceInfo.repositoriesName.push(repositoryInfo);

     userLabelMacket.workspaces.push(workSpaceInfo);

     return userLabelMacket;
}



function getRepositoriesOfUser(user){

     let repositories = null;

     user.workspaces.map(currentWorkspace => {
          repositories = currentWorkspace.repositoriesName;
     })

     return repositories;
}


function countActions(dates, users, mackets, countVar) {

     users.map(user => {
          mackets.map(currentUser => {
               if(user.user.accountId == currentUser.user.accountId ){
                    user.workspaces.map(userWorkspace => {
                         currentUser.workspaces.map(currentWorkspace => {

                              if (userWorkspace.workspaceName == currentWorkspace.workspaceName) {
                                 
                                   userWorkspace.repositoriesName.map(userRepositoryName => {
                                        currentWorkspace.repositoriesName.map(currentRepositoryName => {
                                           
                                             if(userRepositoryName.repositoryName == currentRepositoryName.repositoryName && user.user.createdDate >= dates.start && user.user.createdDate <= dates.end){
                                                  userRepositoryName.actions.map(action => {
                                                       
                                                            
                                                            if(countVar == 'pullRequests'){
                                                                 
                                                                 action.numOfPullRequests ++
                                                            }
                                                            
                                                            if(countVar == 'commits'){
                                                                 
                                                                 action.numOfCommits ++
                                                            }

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
 
export default getInfoFromBitBucket;
