import React from 'react'

import { router } from '@forge/bridge';

import JiraLogo from '../../../../assets/Logos/JiraLabel.png';

import '../css/AccessJira.css';

export default function AccessJira(props){

    setTimeout(() => {
        let jiraAccess = document.getElementsByClassName('access-successful-jira');
        
        if(jiraAccess.length === 0){
            
            if(props.isJiraAccessExist){
                
                let jira = document.getElementsByClassName('no-access-jira')[0];
                
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
            <div className="label-top">
                <img 
                    class="imgs"
                    id="img-jira"
                    src={JiraLogo}/>

                <span className="text-label">Jira Software</span>
            </div>

            <div class="text-body">
              <span>Click on the label to authenticate our app "Actions Of Employees" in Jira</span>
            </div>

            <div class="access no-access-jira">No access</div>
            <button id="btn-jira" onClick={OpenJiraAccess}>AccessJira</button>
            
        </label>
    )
}
