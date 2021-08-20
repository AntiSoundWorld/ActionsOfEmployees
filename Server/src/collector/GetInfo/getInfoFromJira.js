import { jiraMacketProjectKeyInfo, jiraProjectKeyData } from '../Makcets/getMacketForJira.js';
import { userLabel } from '../Makcets/getMacketInfo.js'
import requestsToJira from '../Requests/requestsToJira.js'
import { isAccountIdExistInList } from './Tools/tools.js';

async function getInfoFromJira(dates, jiraAccess, accessId) {
    
    const jiraResponses = await requestsToJira(jiraAccess, accessId);

    let usersInfo = {
        users: getIdentityUsers(jiraResponses.users),
        comments: getInfoFromComments(dates, jiraResponses.comments)
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

function getInfoFromComments(dates, asyncRes) {

    let users = [];
    let datasOfUsers = [];

    asyncRes.map(currentElement => {
        
        currentElement.datas.map(data => {
            data.datas.comments.map(comment => {
                
                let userLabelMacket = userLabel();

                userLabelMacket.projects = currentElement.projectName,
                userLabelMacket.user.accountName = comment.author.displayName,
                userLabelMacket.user.accountId = comment.author.accountId
                userLabelMacket.commentInfo = jiraMacketProjectKeyInfo();
                userLabelMacket.commentInfo.push(jiraProjectKeyData());
                userLabelMacket.createdDate = comment.created.substr(0, 10);
                userLabelMacket.commentInfo.map(commentInfo => {
                    commentInfo.projectKey = data.projectKey
                });

                datasOfUsers.push(userLabelMacket);
        
                if(users.length == 0){
        
                    users.push(userLabelMacket)
                    return;
                }
                
                if(isUserAndProjectExist(users, userLabelMacket) == false) {
            
                    users.push(userLabelMacket)
                }
            })
        });

    })
    
    countComments(dates, users, datasOfUsers);
  
    return combineIdenticalAccounts(users);
}

function combineIdenticalAccounts(users){

    let combinedUsers = []

    users.map(user => {

        if(combinedUsers.length == 0){
        
            combinedUsers.push(JSON.parse(JSON.stringify(user)))
            return;
        }

        if(isUpdateUserSplitter(combinedUsers, user) == false){
            combinedUsers.push(JSON.parse(JSON.stringify(user)))
            return
        }
    });

    return combinedUsers;
}

function isUpdateUserSplitter(userSplitter, user){

    let isExist = false;

    userSplitter.map(currentElement => {
        user.commentInfo.map(comment => {
            if(currentElement.user.accountId == user.user.accountId) {
                currentElement.commentInfo.push(JSON.parse(JSON.stringify(comment)))
                isExist = true;
            }
        });
    });

    return isExist;
}

function isUserAndProjectExist(fullInformation, info) {

    let isExist = false;

    fullInformation.map(currentElement => {
        currentElement.commentInfo.map(commentInfo => {
            info.commentInfo.map(currentInfo => {
                
                    if(currentElement.user.accountId == info.user.accountId && commentInfo.projectKey == currentInfo.projectKey) {
                        isExist = true;
                        return;
                    }
            })
        });
    });
    
    return isExist;
}

function countComments(dates, fullInformation, listOfUsers) {

    fullInformation.map(currentElement => {
        currentElement.commentInfo.map(commentInfo => {
                
            listOfUsers.map(userElement => {
                userElement.commentInfo.map(comment => {
                   

                    if(userElement.user.accountId == currentElement.user.accountId && commentInfo.projectKey == comment.projectKey && userElement.createdDate >= dates.start && userElement.createdDate <= dates.end){
                        commentInfo.numOfComments++;
                    }
                })
            })
        });
    });
}
export default getInfoFromJira;