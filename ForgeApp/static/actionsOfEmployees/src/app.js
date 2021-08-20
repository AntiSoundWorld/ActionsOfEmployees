import { invoke, view } from '@forge/bridge';
import React, { useState, useEffect } from 'react';
import Accesses from './components/accesses/js/Accesses';
import InfoPage from './components/infoPage/js/InfoPage';
import LoginForm from './components/login/js/login';
import defaultDates from './tools/tools';
import Registration from "./components/registration/js/Registration";
import Loading from "./components/loading/js/Loading";
import ResetIntervalInCondition from './tools/resetInterval';

export default function App(){

    const[basicToken, setBasicToken] = useState(localStorage.getItem("basicToken"));

    const[mainPage, setMainPage] = useState(null);

    const[accountVerification, setAccountVerification] = useState(null);

    const[dates, setDates] = useState(defaultDates());

    const[actionsOfEmployees, setActionsOfEmplyees] = useState([]);

    const[isTrigerExist, setIsTrigerExist] = useState(false);

    const[newList, setNewList] = useState([]);

    const[isLoginTap, setIsLogInTap] = useState(null);

    const[isRegistartionTap, setIsRegistartionTap] = useState(null);

    const[isLogout, setIsLogout] = useState(false);

    useEffect(() => {
        
        if(basicToken === null){
            
            setMainPage(<LoginForm setBasicToken={setBasicToken} setIsRegistartionTap={setIsRegistartionTap}/>);
            console.log(mainPage);
            return;
        }

        setMainPage(<Loading />);

        invoke("getAccountVerification", {basicToken: basicToken}).then(newAcountVerification => {

            setAccountVerification(newAcountVerification);
        });
        

    },[basicToken]);

    useEffect(() => {

        let intervalId = 0;

        if(accountVerification === null){

            return;
        }

        if(accountVerification.isAccountExist === false){

            setMainPage(<Registration setBasicToken={setBasicToken} setIsLogInTap={setIsLogInTap}/>);
        }

        if(accountVerification.accesses.isBitBucketAccessExist === false || accountVerification.accesses.isJiraAccessExist === false){

            setMainPage(<Accesses accesses={accountVerification.accesses} state={accountVerification.state}/>);

            intervalId = setInterval(() => {

                invoke("getAccesses", {basicToken}).then(newAccesses => {

                    setAccesses(newAccesses);

                });

            }, 2000);

            return;
        }

        if(accountVerification.accesses.isBitBucketAccessExist && accountVerification.accesses.isJiraAccessExist && isTrigerExist === false){

            invoke("collectActionsOfEmployees", {basicToken: basicToken, dates: dates});
            
            intervalId = setInterval(() => {
                
                invoke("getActionsOfEmployees", {basicToken}).then(newActionsOfEmployees => {

                    setActionsOfEmplyees(newActionsOfEmployees);

                    setNewList(newActionsOfEmployees);

                    ResetIntervalInCondition(intervalId, newActionsOfEmployees);
                });


            }, 3000)


            setIsTrigerExist(true);
        }

        if(accountVerification.accesses.isBitBucketAccessExist && accountVerification.accesses.isJiraAccessExist){

            setMainPage(<InfoPage domen={accountVerification.domen} setIsLogout={setIsLogout} setIsTrigerExist={setIsTrigerExist} newList={newList} setNewList={setNewList} actionsOfEmployees={actionsOfEmployees} dates={dates.dates} setDates={setDates}/>);
        }

    }, [accountVerification, basicToken, newList]);


    useEffect(() => {

        if(isRegistartionTap){

            setMainPage(<Registration setIsLogInTap={setIsLogInTap} setBasicToken={setBasicToken}/>); 
        }

    },[isRegistartionTap]);


    useEffect(() => {

        if(isLoginTap){

            setMainPage(<LoginForm setBasicToken={setBasicToken} setIsRegistartionTap={setIsRegistartionTap}/>); 
        }
    },[isLoginTap]);

    useEffect(() => {

        setActionsOfEmplyees([]);

        setNewList([]);
        
    }, [isTrigerExist]);

    useEffect(() => {

        if(isLogout === false){
            return;
        }

        localStorage.removeItem("basicToken");

        localStorage.removeItem("state");

        setBasicToken(null);

        setAccountVerification(null);

        setIsTrigerExist(false);

        setIsLogout(false);

    }, [isLogout]);

    return(
        mainPage
    )
}