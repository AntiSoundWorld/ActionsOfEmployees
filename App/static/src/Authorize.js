import { invoke } from '@forge/bridge';
import React, { Suspense, useEffect, useState } from 'react';
import InfoPage from './infoPage/js/InfoPage'
import LogInForm from './LabelLog-in/LogInForm/jss/LogInForm';
import UnAuthorized from './MessagesInfo/UnAuthorized/js/UnAuthorized';
import LoadingScreen from './LoadingScreen/js/LoadingScreen';


function Page(){

    
    const[userBasicToken, setUserBasicToken] = useState(localStorage.getItem('token'));
    
    const[label, setLabel] = useState(<h1>await</h1>);
    
    const[status, setStatus] = useState(null);
    
    const[accessToken, setAccessToken] = useState(null);


    useEffect(() => {

        if (userBasicToken === null) {
            setLabel(<LogInForm setUserBasicToken={setUserBasicToken} />);
            return;
        }
        
        invoke('checkIsAuthorized', userBasicToken).then(res => {
            setAccessToken(res.code);
            setStatus(res.status);
        });

        setLabel(<LoadingScreen />);

    }, [userBasicToken]);
    
    useEffect(() => {

        if(status === 200 && localStorage.getItem('token') === null){

            localStorage.setItem("token", userBasicToken);
        }

        if (status === 401) {

            setLabel(
                <UnAuthorized setLabel={setLabel} userBasicToken={userBasicToken}/>
            )
        }

    }, [status])

    return label

}

useEffect(() => {

    if (accessToken != null) {

        setLabel( <InfoPage accessToken={accessToken} />);
    }
},[accessToken]);


export default Page;