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
        <div class="main-form">

        <div class="label">
            <h1>Actions Of Emplyees</h1>
                <text>Login</text>
            </div>
            
            <form class="box">

                <div class="inputs">
                    <i class="fas fa-user"></i>
                    <input id="email" type="email" name="" placeholder="email"></input>
                </div>

                <div class="inputs">
                    <i class="fas fa-lock"></i>
                    <input id="password" type="password" name="" placeholder="Password"></input>
                </div>

                <button class="reg-button" onClick={onSubmitAuthorize}>submit</button>

            </form>
      </div>
    )
}

export default OAuth;