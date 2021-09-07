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
    
    const[isLoginTap, setIsLogInTap] = useState(true);

    const[isRegistartionTap, setIsRegistartionTap] = useState(false);

    const[basicToken, setBasicToken] = useState(localStorage.getItem("basicToken"));

    const[isAccountExist, setIsAccountExist] = useState(false);

    const[accountVerification, setAccountVerification] = useState({state: null, domen: null});

    const[dates, setDates] = useState(defaultDates());

    const[actionsOfEmployees, setActionsOfEmplyees] = useState([]);

    const[isTrigerExist, setIsTrigerExist] = useState(false);

    const[newList, setNewList] = useState([]);

    const[isAccessesExist, setIsAccessesExist] = useState(null);

    const[isLogout, setIsLogout] = useState(false);

    const[isCollectedActions, setIsCollectedActions] = useState(false);

    // useEffect(() => {
    //     invoke('isLicensed', {});
    // },[]);
    let intervalId = 0;


    useEffect(() => {

        if(isLoginTap){

            setMainPage(<LoginForm setBasicToken={setBasicToken} setIsRegistartionTap={setIsRegistartionTap}/>);
            setIsLogInTap(false);
        }

    });

    useEffect(() => {

        if(isRegistartionTap){

            setMainPage(<Registration setIsLogInTap={setIsLogInTap} setBasicToken={setBasicToken}/>);
            setIsRegistartionTap(false)
        }
    });
    
    useEffect(() => {

        if(basicToken === null){
            return
        }

        invoke("isAccountExist", {basicToken}).then(isAccountExist => {

            setIsAccountExist(isAccountExist);
        });

    },[basicToken]);

    useEffect(() => {

        if(isAccountExist === false){
            setIsLogInTap(true)
            return
        }

        if(isTrigerExist){
            return;
        }

        localStorage.setItem('basicToken', basicToken);
        
        setMainPage(<Loading />);
        
        invoke("getAccountVerification", {basicToken: basicToken}).then(newAcountVerification => {

            setAccountVerification(newAcountVerification)
        });

    }, [isAccountExist]);

    useEffect(() => {

        if(accountVerification.state === null || accountVerification.domen === null){
            return
        }
        
        intervalId = setInterval(() => {
                            
            invoke('isAccessesExist', {basicToken}).then(isAccessesExist => {

                setIsAccessesExist(isAccessesExist);

                if (isAccessesExist.isBitBucketAccessExist && isAccessesExist.isJiraAccessExist && isAccessesExist.isConfluenceAccessExist) {
                    
                    clearTimeout(intervalId)
                }
            })
                
        }, 2000);

    }, [accountVerification, isTrigerExist]);

    useEffect(() => {

        console.log("isAccessesExist", isAccessesExist)
        if(isAccessesExist === null){
            
            return;
        }

        if(isAccessesExist.isBitBucketAccessExist === false || isAccessesExist.isJiraAccessExist === false || isAccessesExist.isConfluenceAccessExist === false){

            setMainPage(<Accesses accesses={isAccessesExist} state={accountVerification.state}/>);

            return;
        }
        
        setMainPage(<InfoPage domen={accountVerification.domen} setIsLogout={setIsLogout} setIsTrigerExist={setIsTrigerExist} newList={newList} setNewList={setNewList} actionsOfEmployees={actionsOfEmployees} dates={dates.dates} setDates={setDates}/>);
        
       
        if(isTrigerExist){

            return;
        }

        if(isCollectedActions === false){

            invoke("collectActionsOfEmployees", {basicToken: basicToken, dates: dates});

            setIsCollectedActions(true);
        }


    }, [isAccessesExist, actionsOfEmployees, newList]);
    

    useEffect(() => {

        if(isCollectedActions === false){
            return;
        }

        intervalId = setInterval(() => {
            
            invoke("getActionsOfEmployees", {basicToken}).then(newActionsOfEmployees => {

                setActionsOfEmplyees(newActionsOfEmployees);

                setNewList(newActionsOfEmployees);
                
                if (newActionsOfEmployees.length !== 0) {
                    
                    clearInterval(intervalId);

                    setIsTrigerExist(true);
                }
            });

        }, 3000);
        
    }, [isCollectedActions]);

    useEffect(() => {

        if(isTrigerExist){
            return;
        }

        setIsCollectedActions(false);

        setActionsOfEmplyees([]);

        setNewList([]);

    }, [isTrigerExist]);

    useEffect(() => {

        if(isLogout === false){
            return;
        }
        
        setIsAccountExist(false);

        setActionsOfEmplyees([]);

        setNewList([]);

        localStorage.removeItem("basicToken");

        localStorage.removeItem("state");

        setBasicToken(null);

        setAccountVerification({state: null, domen: null});

        setIsTrigerExist(false);

        setIsCollectedActions(false);

        setIsAccessesExist(null);

        setIsLogInTap(true);

    }, [isLogout]);

    return(
        mainPage
    )
}