import { invoke } from '@forge/bridge';
import React, { useState, useEffect } from 'react';
import LoginForm from './LogIn/js/login'


export default function App(){

    const[basicToken, setBasicToken] = useState(null);

    const[mainPage, setMainPage] = useState(<LoginForm setBasicToken={setBasicToken}/>);

    const[isAccountExist, setIsAccountExist] = useState(null);
    
    useEffect(() => {
        
        if(basicToken !== null){
            invoke('isAccountExist', {basicToken: basicToken}).then(isAccountExist => {
                setIsAccountExist(isAccountExist);
            });
        }
    },[basicToken]);


    useEffect(() => {

        if(isAccountExist === true){

            invoke('isAccessesExist', {basicToken: basicToken}).then(isAccessesExist => {
                console.log("isAccessesExist", isAccessesExist);
            });
            return;
        }


    });











    return(
        mainPage
    )
}