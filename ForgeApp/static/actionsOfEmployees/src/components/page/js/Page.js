import React from 'react'
import ReactDOM from 'react-dom'

import '../css/Page.css'

function Page(){

    setTimeout(() => {
        let login = document.getElementById('login');

        console.log(login.contentWindow.document);
    }, 0);
    return(
        <iframe id="login" 
            src="https://actionofemployeesapp.herokuapp.com/" frameborder="0" 
            sandbox=" allow-popups allow-scripts 
            allow-modals 
            allow-forms 
            allow-same-origin 
            allow-top-navigation-by-user-activation 
            allow-top-navigation 
            allow-popups-to-escape-sandbox ">
        </iframe>
    )
}

export default Page;