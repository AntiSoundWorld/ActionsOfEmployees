import { invoke } from '@forge/bridge';
import React from 'react';
import './../../../LoadingScreen/css/LoadingScreen.css';

import './../css/rangeDates.css'

function RangeDates(props){

    const onSubmitRange = async () => {
        
        let datas = {
            accessToken: props.accessToken,
            dates: {
                start: document.getElementById('start').value,
                end:  document.getElementById('end').value
            }
        }

        invoke('GetInfo', datas).then(promise => {
            props.setUsersInfo(promise);
        });
    }

    function onSubmit(event){
        event.preventDefault();

        let body = document.querySelectorAll('.body');
        
        body.forEach(element => {
            element.classList.add('hide');
        });

        let head = document.getElementById('head');

        let loader = document.createElement('div');
        loader.setAttribute('class', 'loader');
        head.appendChild(loader);

        setTimeout(() => {
            head.removeChild(loader);
            let hide = document.querySelectorAll('.body');
    
            hide.forEach(element => {
                console.log(element);
                element.classList.remove('hide');
            });
        }, 6000);
        
    }

    return (

        <form id='rangeForm'onSubmit={onSubmit}>
            <input id="start" type='date' name="start" label="Start Date" defaultValue={props.dates.start} onChange={event => props.setDates(event.target.value)}/>
            <p></p>
            <input id="end" type='date' name="end" label="End Date" defaultValue={props.dates.end} onChange={event => props.setDates(event.target.value)}/>
            <p></p>
            <button id='range-button' onClick={onSubmitRange} >range</button>
        </ form>
    );
}

export default RangeDates;