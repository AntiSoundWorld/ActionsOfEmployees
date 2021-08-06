// let state = localStorage.getItem('state');

// let bitbucketAccess = document.querySelector('.access-successful-bitbucket');
// let jiraAccess = document.querySelector('.access-successful-bitbucket');

// if(bitbucketAccess === null){

//     actionBitBucketAccessLabel();
// }

// if(jiraAccess === null){

//     actionJiraAccessLabel();
    
// }

// document.getElementById('btn-bitBucket').onclick = async () =>{
//     window.open(`/access_bitbucket?state=${state}`);
// }

// document.getElementById('btn-jira').onclick = () =>{
//     window.open(`/access_jira?state=${state}`);
// }

// function actionBitBucketAccessLabel(){


//     if(getBitBucketAccessStatus() === 200){

//         let bitbucket = document.querySelector('.no-access-bitbucket');
//         bitbucket.classList.remove('no-access-bitbucket');
//         bitbucket.classList.add('access-successful-bitbucket');
//         bitbucket.innerText = 'access-successful';
//     }
//     else{
//         // setTimeout(() => {
//         //     actionBitBucketAccessLabel()
//         // }, 1000);
//     }
// }

// async function getBitBucketAccessStatus(){

//     let res = await fetch(`/is_bitbucket_accessToken_exist`, {

//         headers: {
//             "Authorization": localStorage.getItem('basicToken')
//         }
//     });

//     return res.status; 
// }


// function actionJiraAccessLabel(){

//     if(getJiraAccessStatus() === 200){

//         let jira = document.querySelector('.no-access-jira');
//         jira.classList.remove('no-access-jira');
//         jira.classList.add('access-successful-jira');
//         jira.innerText = 'access-successful';
//     }
//     else{
//         // setTimeout(() => {
//         //     actionJiraAccessLabel();
//         // }, 1000);
       
//     }
// }

// async function getJiraAccessStatus(){

//     let res = await fetch(`/is_jira_accessToken_exist`, {

//         headers:{
//             "Authorization": localStorage.getItem('basicToken')
//         }
//     });

//     return res.status;
// }