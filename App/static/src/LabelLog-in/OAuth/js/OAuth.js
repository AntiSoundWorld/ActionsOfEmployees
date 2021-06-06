import { invoke } from '@forge/bridge';
import {Base64} from 'js-base64';
import React from 'react';

import './../css/OAuth.css'

function OAuth(props){
    
    const onSubmitAuthorize = async () => {
        
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        
        let basicToken = "Basic " + Base64.btoa(email + ":" + password);
        
        props.setUserBasicToken(basicToken);
    };

    return(
        <div id='oauthForm'>
            <input id='email' type="email" name="email" label="Email" defaultValue='antisoundworld@gmail.com'/>
            <p></p>
            <input id='password' type='password' name="password" label="password" defaultValue='qweasdzxc117'/>
            <p></p>
            <button id='auth-button' onClick ={onSubmitAuthorize}>Отправить</button>

            </ div>
    )
}

export default OAuth;