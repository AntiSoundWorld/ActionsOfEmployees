import { invoke } from '@forge/bridge';
import React, { useState, useEffect } from 'react';
import Accesses from './components/accesses/js/Accesses';
import InfoPage from './components/infoPage/js/InfoPage';
import LoginForm from './components/login/js/login';
import defaultDates from './tools/tools';

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

    useEffect(() => {
        
        if(basicToken === null){

            setMainPage(<LoginForm setBasicToken={setBasicToken}/>);
            return;
        }

        invoke('isAccountExist', {basicToken: basicToken}).then(isAccountExist => {
            setIsAccountExist(isAccountExist);
        });

    },[basicToken]);


    useEffect(() => {

        if(isAccountExist === true){

            localStorage.setItem("basicToken", basicToken);


            setInterval(() => {
                invoke('isAccessesExist', {basicToken: basicToken}).then(isAccessesExist => {
                    setAccesses(isAccessesExist);
                });
            }, 5000);
        }
    }, [isAccountExist]);

    useEffect(() => {

        if(state === null && basicToken != null){

            invoke('getState', {basicToken: basicToken}).then(state => {
                setState(state);
            });
        }
    },[state]);


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
        
        if(accesses.isBitBucketAccessExist === false && accesses.isJiraAccessExist === false){
            setMainPage(<Accesses accesses={accesses} state={state}/>);
        }
        
    }, [accesses]);
    
    useEffect(() => {

        setMainPage(<InfoPage setIsTrigerExist={setIsTrigerExist}newList={newList} setNewList={setNewList} actionsOfEmployees={actionsOfEmployees} dates={dates.dates} setDates={setDates}/>);
    },[actionsOfEmployees, newList]);

    useEffect(() => {

        setNewList([]);
        
    }, [isTrigerExist]);


    return(
        mainPage
    )
}