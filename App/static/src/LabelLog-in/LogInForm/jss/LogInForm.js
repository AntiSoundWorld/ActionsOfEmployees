import React from 'react';
import OAuth from '../../OAuth/js/OAuth';

import '../css/LogInForm.css'

function LogInForm(props){
    
    return (
        <form id='mainLabel'>
            <img 
                id='labelBitBucket'
                src='https://upload.wikimedia.org/wikipedia/commons/f/fc/Bitbucket_Logo.png'
                >
            </img>

            <OAuth setUserBasicToken={props.setUserBasicToken}/>
            
        </form>
    )
}

export default LogInForm;