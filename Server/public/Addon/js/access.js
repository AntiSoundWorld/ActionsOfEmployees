let state = localStorage.getItem('state');

setTimeout(async () => {

    let bitucketDone = document.querySelector('.label-Bitbucket.done');
    let JiraDone = document.querySelector('.label-jira.done');

    if(bitucketDone === null){
        let resB = await fetch(`/get_bitbucket_access_token`,{
            headers:{
                "Authorization": localStorage.getItem('basicToken')
            }
        });
        if(resB.status === 200){
            let bitbucket = document.querySelector('.label-Bitbucket');
            bitbucket.classList.add('done');
        }
    }

    if(JiraDone === null){
        let resJ = await fetch(`/get_jira_access_token`,{
            headers:{
                "Authorization": localStorage.getItem('basicToken')
            }
        });

        if(resJ.status === 200){
            let jira = document.querySelector('.label-jira');
            jira.classList.add('done');
        }
    }
}, 1000);

document.getElementById('btn-bitBucket').onclick = async () =>{
    window.open(`/access_bitbucket?state=${state}`);
}

document.getElementById('btn-jira').onclick = () =>{
    window.open(`/access_jira?state=${state}`);
}