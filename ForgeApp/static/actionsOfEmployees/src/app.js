import { invoke } from '@forge/bridge';
import React, { useState, useEffect } from 'react';
import Accesses from './components/accesses/js/Accesses';
import InfoPage from './components/infoPage/js/InfoPage';
import LoginForm from './components/login/js/login';
import defaultDates from './tools/tools';
import Registration from "./components/registration/js/Registration";
import Loading from "./components/loading/js/Loading";
export default function App(){

    const[basicToken, setBasicToken] = useState(localStorage.getItem("basicToken"));

    const[mainPage, setMainPage] = useState(null);

    const[isAccountExist, setIsAccountExist] = useState(null);
    
    const[accesses, setAccesses] = useState(null);

    const[state, setState] = useState(localStorage.getItem('state'));

    const[dates, setDates] = useState(defaultDates());

    const[actionsOfEmployees, setActionsOfEmplyees] = useState([]);

    const[isTrigerExist, setIsTrigerExist] = useState(false);

    const[newList, setNewList] = useState([]);

    const[isLoginTap, setIsLogInTap] = useState(null);

    const[isRegistartionTap, setIsRegistartionTap] = useState(null);

    useEffect(() => {
        
        console.log("basicToken", basicToken);
        if(basicToken === null){
            
            setMainPage(<LoginForm setBasicToken={setBasicToken} setIsRegistartionTap={setIsRegistartionTap}/>);
            return;
        }
        
        setMainPage(<Loading />);

        invoke('isAccountExist', {basicToken: basicToken}).then(isAccountExist => {
            console.log("isAccountExist", isAccountExist);
            setIsAccountExist(isAccountExist);
        });

    },[basicToken]);


    useEffect(() => {

        if(isAccountExist){
            

            localStorage.setItem("basicToken", basicToken);

            invoke('getState', {basicToken: basicToken}).then(state => {
                setState(state);
            });

            setInterval(() => {
                invoke('isAccessesExist', {basicToken: basicToken}).then(isAccessesExist => {
                    setAccesses(isAccessesExist);
                });
            }, 5000);
        }
       
        if(isAccountExist === false){
            setMainPage(<Registration setBasicToken={setBasicToken} setIsLogInTap={setIsLogInTap}/>); 
        }
    }, [isAccountExist]);

    useEffect(() => {

        if(accesses === null){
            return;
        }

        if(accesses.isBitBucketAccessExist && accesses.isJiraAccessExist && isTrigerExist === false){
            
            invoke("collectInformations", {basicToken: basicToken, dates: dates});

            setTimeout(() => {
        
                invoke("getActionsOfEmployees", {basicToken: basicToken}).then(actionsOfEmployees => {
                    setNewList(actionsOfEmployees);
                    setActionsOfEmplyees(actionsOfEmployees);
                });
            }, 5000);

            setIsTrigerExist(true);
        }
        
        if(accesses.isBitBucketAccessExist === false || accesses.isJiraAccessExist === false){

            setMainPage(<Accesses accesses={accesses} state={state}/>);
        }

        if(accesses.isBitBucketAccessExist && accesses.isJiraAccessExist){

            setMainPage(<InfoPage setIsTrigerExist={setIsTrigerExist}newList={newList} setNewList={setNewList} actionsOfEmployees={actionsOfEmployees} dates={dates.dates} setDates={setDates}/>);
        }
        
    }, [accesses, actionsOfEmployees, state, newList]);

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

       
    },[actionsOfEmployees, newList]);

    useEffect(() => {

        setNewList([]);
        
    }, [isTrigerExist]);


    return(
        // <Loading />
        mainPage
    )
}