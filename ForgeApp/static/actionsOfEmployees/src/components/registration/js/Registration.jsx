import { invoke } from "@forge/bridge";
import btoa from 'btoa';

import '../css/Registartion.css';

export default function Registration(props){

    function OnClick(){

        props.setIsLogInTap(true);
    }

    async function OnSubmit(event){

        event.preventDefault();
          console.log(event)  
        let email = event.target.email.value
        
        let password = event.target.password.value
        
        let confirmPassword = event.target.confirmPassword.value;

        if (email.length == 0) {
            return;
        }
        
        if(password != confirmPassword){

            let form = document.querySelector('.box');

            let err = document.createElement('span');

            err.classList.add('error');
            err.setAttribute('value', 'password missmatch');
            
            form.appendChild(err);
            return;
        }

        let state = '';
        
        if (localStorage.getItem('state') === null) {

            var possible = email + password;

            for (var i = 0; i < 3; i++){

                state += possible.charAt(Math.floor(Math.random() * possible.length));
                state = btoa(state);
            } 

            localStorage.setItem('state', state);
        }
        else{
            state = localStorage.getItem('state')
        }

        const basicToken = btoa(`${email}:${password}`);
        
        invoke("registration", {email, state, password}).then(status => {
            
            if(status == 201){

                localStorage.setItem('basicToken', basicToken)
                props.setBasicToken(basicToken);
            }
        });
    }

    return (
        <div class="main-form">

            <div class="label">
            <h1>Actions Of Emplyees</h1>
                <text>registration</text>
            </div>
            
            <form class="box" onSubmit={OnSubmit}>

                <div class="inputs">
                    <i class="fas fa-user"></i>
                    <input id="email" type="email" name="" placeholder="email" />
                </div>

                <div class="inputs">
                    <i class="fas fa-lock"></i>
                    <input id="password" type="password" name="" placeholder="Password" />
                </div>

                <div class="inputs">
                    <i class="fas fa-lock"></i>
                    <input id="confirmPassword" type="password" name="" placeholder="confirm-Password" />
                </div>
                
                <button class="login-btn" onClick={OnClick}>Login</button>
                <button class="reg-button" type="submit">submit</button>

            </form>
      </div>
    )
}

