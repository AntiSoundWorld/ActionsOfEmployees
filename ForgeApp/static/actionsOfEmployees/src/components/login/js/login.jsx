import { router } from '@forge/bridge';
import React from 'react'
import btoa from 'btoa'

import '../css/LoginForm.css' 


function LoginForm(props){

    function OnClick(){

        props.setIsRegistartionTap(true);

    }

    async function Submit(event){

        event.preventDefault();
        
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
    
        let basicToken = btoa(`${email}:${password}`);
    
        props.setBasicToken(basicToken);

    }
    return (
        <div class="main-form">

            <div class="label">
            <h1>Action Of Emplyees</h1>
                <text>Login</text>
            </div>
            
            <form class="box" onSubmit={Submit}>

                <div class="inputs">
                    <i class="fas fa-user"></i>
                    <input id="email" type="email" name="" placeholder="email"></input>
                </div>

                <div class="inputs">
                    <i class="fas fa-lock"></i>
                    <input id="password" type="password" name="" placeholder="Password"></input>
                </div>

                <button class="registration" onClick={OnClick}>registration</button>

                <input class="reg-button" type="submit"></input>

            </form>
        </div>
    )
}

export default LoginForm;
