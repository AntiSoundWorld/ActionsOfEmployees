
export function isAccountIdExistInList(listOfUsers, user){

    let isAccountIdExist = false;

    if(listOfUsers.length === 0){

        return isAccountIdExist;
    }

    listOfUsers.foreach(currentUser => {

        if(currentUser.user.accountId === user.user.accountId){
            isAccountIdExist = true;
        }
    });

    return isAccountIdExist;
}

export function showUserInfo(user){
     
    console.log(user);
    user.workspaces.foreach(workspace => {
        workspace.repositoriesName.foreach(repositoryName => {
            console.log(repositoryName);
        })
    });
}

export function showUsersInfo(users){

users.foreach(user => {
    showUserInfo(user);
});
}

export function getIdenticalAndUnIndenticalUsers(searchedListOfUsers, listOfUsers){
    
    let users = {
        existingUsers: null,
        unExistingUsers: null
    }

    let existingUsers = [];
    let unExistingUsers = [];
    
    listOfUsers.foreach(currentUser => {
        
        let isUserExist = false;
        
            searchedListOfUsers.foreach(user => {

            if(user.user.accountId === currentUser.user.accountId){
                isUserExist = true;
            }
        })

        if(isUserExist === true){
            existingUsers.push(JSON.parse(JSON.stringify(currentUser)));
        }
        else{
            unExistingUsers.push(JSON.parse(JSON.stringify(currentUser)));
        }
    });

    users.existingUsers = existingUsers;
    users.unExistingUsers = unExistingUsers;
    
    return users;
}

export function getAllUsers(infoUsersJira){

    let allUsers = [];

    infoUsersJira.users.foreach(curentUser => {

        allUsers.push(JSON.parse(JSON.stringify(curentUser)));
    })

    return allUsers;

}
export function countActionsbyUser(user, determinate){

    let num = 0;

    if (determinate === 'commits' || determinate === 'pullRequests') {
        num = countActionsCommitsOrPullRequests(user, determinate);
    }

    if (determinate === 'comments') {
        num = countActionComments(user, determinate);
    }

    return num;
}

function countActionComments(user){

    let num = 0;

    user.commentInfo.foreach(comment => {
        num = num + comment.numOfComments;
    });

    return num;
}
export function countActionsCommitsOrPullRequests(user, determinate){

    let typeOfAction = null;
  
    let num = 0;

    user.workspaces.foreach(workspace => {
        workspace.repositoriesName.foreach(repository => {
            repository.actions.foreach(action => {

                if(determinate === 'pullRequests'){
                    typeOfAction = action.numOfPullRequests;
                }

                if(determinate === 'commits'){
                    typeOfAction = action.numOfCommits;
                }

                num = num + typeOfAction;
            });
        });
    });

    return num;
}

function getAllUsersInfoFromJira(allUsers, infoUsersJira){


    infoUsersJira.comments.foreach(user => {
       
        allUsers.foreach(currentUser => {

            if(currentUser.user.accountId === user.user.accountId){
                
                currentUser.jira = [];
                currentUser.jira.push({

                    projects: user.projects,
                    comments: user.commentInfo
                });
            }
        });

    });

    return allUsers;
}

export function getIsExistInfo(comparedUser, soughtUser) {

    let isExistInfo = {
         isAccountIdExist: false,
         isWorkspaceExist: false,
         isRepositoryNameExist: false,
    }

    soughtUser.workspaces.foreach(sougthWorkspace => {
         sougthWorkspace.repositoriesName.foreach(sougthRepositoryName => {

              comparedUser.workspaces.foreach(currentComparedWorkspace => {
                   currentComparedWorkspace.repositoriesName.foreach(currentComparedRepositoryName => {

                        if(soughtUser.user.accountId === comparedUser.user.accountId){
                             isExistInfo.isAccountIdExist = true;

                             if(sougthWorkspace.workspaceName === currentComparedWorkspace.workspaceName){
                                  isExistInfo.isWorkspaceExist = true;

                                  if(sougthRepositoryName.repositoryName === currentComparedRepositoryName.repositoryName){
                                       isExistInfo.isRepositoryNameExist = true;
                                  }
                             }
                        }
                   });
              });
         });
    });
        
    return isExistInfo;
}

export function getDates(){

    let date = new Date();
    
    let year = date.getFullYear()
    let month = date.getMonth();
    
    if(month < 10){
        month =  month + 1;
        month = '0' + month
    }

    let endDay = null;

    if(month === '02' || month === '04' || month === '06' || month === '09' || month === '11'){

        endDay = '30';
    }
    else{
        endDay = '31';
    }
    

    let dates = {
        start: year + '-' + month + '-' + '01',
        end: year + '-' + month + '-' + endDay
    }

    return dates;
}