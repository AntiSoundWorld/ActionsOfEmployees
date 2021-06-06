import { invoke } from '@forge/bridge';
import React from 'react';

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
            console.log(promise);
            props.setUsersInfo(promise);
        });

        // props.setMacket();
    }

    function onSubmit(event){
        event.preventDefault();
    }

    console.log(props.dates.start);
    console.log(props.dates.end);
    return (

        <form id='rangeForm'onSubmit={onSubmit}>
            <input id="start" type='date' name="start" label="Start Date" defaultValue={props.dates.start} onChange={event => props.setDates(event.target.value)}/>
            <p></p>
            <input id="end" type='date' name="end" label="End Date" defaultValue={props.dates.end} onChange={event => setDates(event.target.value)}/>
            <p></p>
            <button id='range-button' onClick={onSubmitRange} >submit</button>
        </ form>
    );
}

export default RangeDates;