import RequestsToConfluence from "../Requests/requestsToConfluence.js";
import { getUsers,} from "./Tools/tools.js";
import substr from "substr-word"

export default async function GetInfoFromConfluence(jiraAccessId, accessToken, dates){

   const confluenseResponses  = await RequestsToConfluence(jiraAccessId, accessToken);

   const infoConfluence = {

        infoBlogPosts: getInfoFromResponse(confluenseResponses.infoBlogPosts, dates, "blogPosts"),
        infoPages: getInfoFromResponse(confluenseResponses.infoPages, dates, "pages"),
    }

    return infoConfluence;
}

function getInfoFromResponse(response, dates, countVar){

    const users = getUsers(response);
    const usersMacket = getUserMacket(users, response, countVar);
    countActions(dates, response, usersMacket, countVar);

    return usersMacket;
}

function getUserMacket(users, response, countVar){
    
    const macketOfUsers = [];

    users.map(user => {

        const newUser = {
            user: {
                accountId: null,
                email: null,
                userName: null
            },
            spaces:[]
        }

        response.map(currentUser => {
            
            
            if(currentUser.user.accountId !== user.user.accountId){
                return;
            }

            
            newUser.user.accountId = user.user.accountId;
            newUser.user.email = user.user.email;
            newUser.user.userName = user.user.userName;

            let action = null;
            
            if(countVar === 'blogPosts'){
                action = {
                    numOfBlogPosts: 0
                }
            }
            if(countVar === 'pages'){

                action = {
                    numOfPages: 0
                }
            }

            
            if(newUser.spaces.length === 0){
                
                newUser.spaces.push({
                    space: currentUser.datas.space,
                    action: action
                })
                
                return;
            }
            
            let isSpaceExist = false;

          
            newUser.spaces.forEach((space) => {

                if(currentUser.datas.space === space.space){
                    isSpaceExist = true;
                }
            })

            if(isSpaceExist){
                return
            }
            
            newUser.spaces.push({
                space: currentUser.datas.space,
                action: action
            })
        });

        macketOfUsers.push(newUser)
    })

    return macketOfUsers;
}

function countActions(dates, users, mackets, countVar) {
    // console.log('=======================', countVar, '=======================');

    mackets.forEach(currentMacketUser => {
        users.map(user => {
            
            if (user.user.accountId !== currentMacketUser.user.accountId) {
                return;
            }
            
            currentMacketUser.spaces.forEach(currentSpaceMacket => {
                
                if (user.datas.space !== currentSpaceMacket.space) {
                    return;
                }

                const created_on = user.datas.created_on;

                if (substr(created_on, 10) < dates.start || substr(created_on, 10) > dates.end) {
                    return;
                }
                
                if (countVar === 'blogPosts') {
                    currentSpaceMacket.action.numOfBlogPosts ++;
                }
                
                if (countVar === 'pages') {
                    currentSpaceMacket.action.numOfPages ++;
                }

                
                // console.log(currentSpaceMacket)
            });
        });
    })
  

    return users;
}