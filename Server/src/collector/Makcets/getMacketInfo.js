import { jiraProjectNames } from "./getMacketForJira.js";

function GetMacketInfo () {
    
    return jiraInformation();
}

function jiraInformation() {

    let jiraInformation = {

        accountName: null,
        accountId: null,
        projectName: null,
        info: {
            jira: [
                jiraProjectNames()
            ],

            bitBucket: [
                bitBucketWorkspaces()
            ]
            
        }
    }

    return jiraInformation;
}

export function userLabel(){

    let userLabel = {

        user: {
            accountAvatar: null,
            accountName: null,
            accountId: null,
            emailAddress: null
        }
    }

    return userLabel;
}


export function bitBucketWorkspaces() {

    let workspaces =  {
        workspaceName: null,
        repositories: bitBucketRepositories()
    }

    return workspaces;
}

export function bitBucketInfoCount() {
    
    let infoCount = {
        numOfCommits: 0,
        numOfPullRequests: 0
    }

    return infoCount;
}

export function bitBucketRepositories(){

    let repositories = {
        repositoryName: null,
        infoCount: bitBucketInfoCount()
    }

    return repositories;
}


export default GetMacketInfo;