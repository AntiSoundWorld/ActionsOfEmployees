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

    const[mainPage, setMainPage] = useState(null);

    const[basicToken, setBasicToken] = useState(localStorage.getItem("basicToken"));

    const[isAccountExist, setIsAccountExist] = useState(false);

    const[accountVerification, setAccountVerification] = useState({accesses: null, state: null, domen: null});

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
            return;
        }
        
        invoke("isAccountExist", {basicToken}).then(isAccountExist => {

            setIsAccountExist(isAccountExist);
        });

        if(isAccountExist === false && basicToken === null){
            
            setMainPage(<Registration setBasicToken={setBasicToken} setIsLogInTap={setIsLogInTap}/>);
            return;
        }

        setMainPage(<Loading />);

        invoke("getAccountVerification", {basicToken: basicToken}).then(newAcountVerification => {
            
            setAccountVerification(prevState => ({
                ...prevState,
                state: newAcountVerification.state,
                domen: newAcountVerification.domen
            }));
            
        });

        // setInterval(() => {
                    
            invoke('isAccessesExist', {basicToken}).then(isAccessesExist => {
                setAccountVerification(prevState => ({

                    ...prevState,   
                    accesses:isAccessesExist
                }));
            });
           
        // }, 2000);
    },[basicToken, isAccountExist]);

    useEffect(() => {

        let intervalId = 0;

        if(accountVerification.accesses === null){

            return;
        }

        if(accountVerification.accesses.isBitBucketAccessExist === false || accountVerification.accesses.isJiraAccessExist === false || accountVerification.accesses.isConfluenceAccessExist === false){

            setMainPage(<Accesses accesses={accountVerification.accesses} state={accountVerification.state}/>);

            return;
        }

        if(accountVerification.accesses.isBitBucketAccessExist && accountVerification.accesses.isJiraAccessExist && isTrigerExist === false){

            invoke("collectActionsOfEmployees", {basicToken: basicToken, dates: dates});
            
            intervalId = setInterval(() => {
                
                invoke("getActionsOfEmployees", {basicToken}).then(newActionsOfEmployees => {

                    console.log(newActionsOfEmployees)
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

    }, [accountVerification, basicToken, newList, isTrigerExist]);


    useEffect(() => {

        if(isRegistartionTap){

            setMainPage(<Registration setIsLogInTap={setIsLogInTap} setBasicToken={setBasicToken}/>); 
        }

    },[isRegistartionTap]);

    useEffect(() => {

       
    }, [accountVerification])


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