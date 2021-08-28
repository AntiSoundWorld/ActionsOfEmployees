import RequestsToConfluence from "../Requests/requestsToConfluence.js";
import { getUsers, isAccountIdExistInList,} from "./Tools/tools.js";
import substr from "substr-word"

export default async function GetInfoFromConfluence(jiraAccessId, accessToken, rangeDates){

   const contentInfo = await RequestsToConfluence(jiraAccessId, accessToken);

   const infoConfluence = {
       
        infoPages: await getInfoFromResponse(contentInfo.pages, rangeDates, "pages"),
        infoBlogs: await getInfoFromResponse(contentInfo.blogs, rangeDates, "blogs"),
    }

    // console.log(infoConfluence);
    return infoConfluence;
}

function getInfoFromResponse(contentInfo, rangeDates, countVar){

    const users = contentInfo.map(content => {

        const usersEdits = getUsers(content.edits);
        const usersComments = getUsers(content.comments);


        return {usersEdits, usersComments}
    });

    const usersEdits = getUsersDromDifferentsTypes(users, "edits");
    const usersComments = getUsersDromDifferentsTypes(users, "comments")

    const usersEditsMacket = getUserMacket(usersEdits, contentInfo, "edits", countVar);
    const usersCommentsMacket = getUserMacket(usersComments, contentInfo, "comments", countVar);
    
    const edits = countActions(rangeDates, contentInfo, usersEditsMacket, 'edits' ,countVar);
    const comments = countActions(rangeDates, contentInfo, usersCommentsMacket, 'comments' ,countVar);

    return {edits, comments};
}


function getUserMacket(users, contentInfo, action ,countVar){
    
    const macketOfUsers = [];

    let path = null;
    

    users.map(user => {
        
        
        const newUser = {
            user: {
                accountId: null,
                email: null,
                userName: null
            },
            spaces:[]
        }

        contentInfo.map(currentContent => {


            if(action === 'edits'){
                path = currentContent.edits;
            }
            
            if(action === 'comments'){
                path = currentContent.comments;
                
            }
            
            if (currentContent.id === 'trashed' || path.length === 0) {
                return;
                
            }

            path.map(path => {

                let nameActionsOfUser = null;

                if(user.accountId !== path.user.accountId){
                    return;
                }
    
                newUser.user.accountId = user.accountId;
                newUser.user.email = user.email;
                newUser.user.userName = user.userName;
                
                if(countVar === 'blogs' && action === 'edits'){

                    nameActionsOfUser = {
                        numOfEditsBlogPosts: 0
                    }
                }

                if(countVar === 'pages' && action == "edits"){
    
                    nameActionsOfUser = {
                        numOfEditsPages: 0
                    }
                }

                if(countVar === 'blogs' && action === 'comments'){

                    nameActionsOfUser = {
                        numOfCommentsBlogPosts: 0
                    }
                }

                if(countVar === 'pages' && action === 'comments'){
    
                    nameActionsOfUser = {
                        numOfCommentsPages: 0
                    }
                }

                if(newUser.spaces.length === 0){
                
                    newUser.spaces.push({
                        space: currentContent.space,
                        action: nameActionsOfUser
                    })
                    
                    return;
                }

                let isSpaceExist = false;

          
                newUser.spaces.forEach((space) => {
    
                    if(currentContent.space === space.space){
                        isSpaceExist = true;
                    }
                })
    
                if(isSpaceExist){
                    return
                }
                
                newUser.spaces.push({
                    space: currentContent.space,
                    action: nameActionsOfUser
                })
            })
  
        });
        macketOfUsers.push(newUser)

    })
            
    return macketOfUsers;
}

function getUsersDromDifferentsTypes(usersActions, countVar){

    let actions = null;
    
    const users = [];
    
    usersActions.map(userAction => {
        
   
        if(countVar === 'edits'){
            actions = userAction.usersEdits;
        }
    
        if(countVar === 'comments'){
            actions = userAction.usersComments;
        }
        if(actions.length === 0){
            return;
        }
     
        actions.map(action => {
            let isAccountExist = false;

            if (users.length === 0) {
                users.push(action.user);
                return;
            }
            
            users.map(user => {
                if(user.accountId === action.user.accountId ){
                    isAccountExist = true;
                }
            })
            
            if (isAccountExist) {
                return;
            }
            
            users.push(action.user);
        })
        
    });

    return users;
}

function countActions(dates, contents, mackets, action, countVar) {
    // console.log('=======================',countVar, " - ",action, '=======================');

    mackets.forEach(currentMacketUser => {

        contents.map(content => {
            
            let path = null;

            if(action === 'edits'){

                path = content.edits;
            }
            
            if(action === 'comments'){

                path = content.comments;
                
            }

            path.map(currentAction => {
                
                if (currentMacketUser.user.accountId !== currentAction.user.accountId) {
                    return;
                }

                currentMacketUser.spaces.forEach(currentSpaceMacket => {
                    if (content.space !== currentSpaceMacket.space) {
                        return;
                    }
                    
                    const created_on = currentAction.datas.created_on;
                    
                    if (substr(created_on, 10) < dates.start || substr(created_on, 10) > dates.end) {
                        return;
                    }
                    
                    if (countVar === 'blogs' && action === 'edits') {
                        currentSpaceMacket.action.numOfEditsBlogPosts ++;
                    }
                    
                    if (countVar === 'blogs' && action === 'comments') {
                        currentSpaceMacket.action.numOfCommentsBlogPosts ++;
                    }
                    
                    if (countVar === 'pages' && action === 'edits') {
                        currentSpaceMacket.action.numOfEditsPages++;
                    }
               
                    if (countVar === 'pages' && action === 'comments') {
                        currentSpaceMacket.action.numOfCommentsPages ++;
                    }
                });
            })
        });
    })
  
    return mackets;
}