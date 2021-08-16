import React from 'react'

import { router } from '@forge/bridge';
import JiraLogo from '../../../../tools/img/jira.png';
import '../css/AccessJira.css'

export default function AccessJira(props){

    setTimeout(() => {
        let jiraAccess = document.getElementsByClassName('access-successful-jira');
        
        if(jiraAccess.length === 0){
            
            if(props.isJiraAccessExist){
                
                let jira = document.getElementsByClassName('no-access-jira')[0];
                
                // jira.removeAttribute('no-access-jira');
                // jira.setAttribute("access-successful-jira");
                
                jira.classList.remove('no-access-jira');
                jira.classList.add('access-successful-jira');
                jira.innerText = 'access-successful';
            }
        }
    }, 0);



    function OpenJiraAccess(){

        router.open(`https://actionsofemployees.herokuapp.com/access_jira?state=${props.state}`);
    }

    return(
        <label class="label-jira label-access" >
            <img 
                class="imgs"
                id="img-jira"
                src={JiraLogo}   />

            <div class="text">
            <span>Click on the label to authenticate our app "Actions Of Emplyees" in Jira</span>
            </div>

            <div class="access no-access-jira">No access</div>

            <button id="btn-jira" onClick={OpenJiraAccess}>AccessJira</button>
        </label>
    )
}
