
export default {
    state:{
        accountStatus: 'no access',
    },
    getters:{
        getStatus(state){
            return state.status;
        }
    },
    getters:{
        getAccountStatus(state){
            return state.accountStatus;
        }
    },
    actions:{
        async isAccountExist({dispatch}, basicToken){
           
      
            let isAccountExist = await fetch(`https://actionsofemployees.herokuapp.com/is_account_exist`, {
                method: 'POST',
                headers:{
                    'Authorization': `Basic ${basicToken}`,
                }
            })
           
            if(isAccountExist.status === 404){
                window.open('https://actionsofemployees.herokuapp.com');
                return;
            }

            localStorage.setItem('basicToken', basicToken);
            dispatch('isAccessesExist', basicToken);
        },
        async isAccessesExist({commit, dispatch, mutations}, basicToken){

     
            let isJiraAcessExist = await fetch(`https://actionsofemployees.herokuapp.com/is_jira_accessToken_exist`, {
                headers:{
                    'Authorization': `Basic ${basicToken}`
                }
            })
            
            let isBitbucketAccessExist = await fetch(`https://actionsofemployees.herokuapp.com/is_bitbucket_accessToken_exist`, {
                headers:{
                    'Authorization': `Basic ${basicToken}`
                }
            })

            if(isJiraAcessExist.status === 204 || isBitbucketAccessExist.status === 204){
                window.open('https://actionsofemployees.herokuapp.com/access', '_self');
            }

            if(isJiraAcessExist.status === 200 && isBitbucketAccessExist.status === 200){
                dispatch('getInformation');

                commit('updateAccountStatus', 'access-successfull');
                router.push('/ActionsOfEmployees')
            }
        },
    },
    mutations:{
        updateAccountStatus(state, accountStatus){
            state.accountStatus = accountStatus;
        }
    }
}