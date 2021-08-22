import { getAllUsers, getCreatemeta } from "../Requests/requestsToJira.js";
import {getIdentityUsers} from '../GetInfo/getInfoFromJira.js'

async function GetMacketForRender() {

    let macketForRender = []
    
    let users = await getUsers();

    users.map(user => {

        let userInfo = info();
        userInfo.accountId = user.user.accountId;
        userInfo.accountName = user.user.accountName;

        macketForRender.push(userInfo);
    });

    return macketForRender
}

async function getUsers(){
    
    let createmeta = await getCreatemeta(); // createmeta.projects

    return getIdentityUsers(await getAllUsers(createmeta));
}

export function info() {

    let info = {
        accountAvatar: null,
        accountName: null,
        numOfComments: 0,
        numOfCommits: 0,
        numOfpullRequests: 0,
        numCommentsOfCommits: 0
    }

    return info;
}



export default GetMacketForRender