import React from 'react'

import { router } from '@forge/bridge';
import ConfluenceLogo from '../../../../assets/Logos/confluence.png';
import '../css/AccessConfluence.css'

export default function AccessConfluence(props){

    setTimeout(() => {
        let jiraAccess = document.getElementsByClassName('access-successful-confluence');
        
        if(jiraAccess.length === 0){
            
            if(props.isConfluenceAccessExist){
                
                let jira = document.getElementsByClassName('no-access-confluence')[0];
                
                // jira.removeAttribute('no-access-jira');
                // jira.setAttribute("access-successful-jira");
                
                jira.classList.remove('no-access-confluence');
                jira.classList.add('access-successful-confluence');
                jira.innerText = 'access-successful';
            }
        }
    }, 0);



    function OpenConfluenceAccess(){

        router.open(`https://actionsofemployees.herokuapp.com/access_confluence?state=${props.state}`);
    }

    return(
        <label class="label-confluence label-access" >
            <img 
                class="imgs"
                id="img-confluence"
                src={ConfluenceLogo} />

            <div class="text">
                <span>Click on the label to authenticate our app "Actions Of Employees" in Confluence</span>
            </div>

            <div class="access no-access-confluence">No access</div>

            <button id="btn-confluence" onClick={OpenConfluenceAccess}>AccessJira</button>
        </label>
    )
}
