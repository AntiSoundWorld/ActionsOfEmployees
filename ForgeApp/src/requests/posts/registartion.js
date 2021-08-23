import {fetch} from "@forge/api";

export default async function  Registration(state, email, password){

    let response = await fetch(`https://actionsofemployees.herokuapp.com/registration`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            state: state,
            email: email,
            password: password
        })
    });

    console.log(response);
    return response.status;
}