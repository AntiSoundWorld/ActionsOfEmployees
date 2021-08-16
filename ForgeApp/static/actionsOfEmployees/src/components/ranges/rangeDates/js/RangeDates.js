import React from 'react'
import ReactDOM from 'react-dom'

import '../css/RangeDates.css'

export default function RangeDates(props){

    function OnSubmitRange(event){
        
        event.preventDefault();

        props.setNewList([]);
        
        let dates = {
            dates: {
                start: event.target.start.value,
                end: event.target.end.value
            }
        }
        
        props.setDates(dates);
    }

    return (
        <form id='rangeForm' onSubmit={OnSubmitRange}>
            <input id="start" type='date' name="start" label="Start Date" defaultValue={props.dates.start}/>
            <p></p>
            <input id="end" type='date' name="end" label="End Date" defaultValue={props.dates.end} />
            <p></p>
            <button id='range-button'>range</button>
        </form>
    )
}

function HideBodyTable(){

    let bodyTable = document.querySelectorAll('.body');

    bodyTable[0].classList.add("hide");
    bodyTable[1].classList.add("hide");
    bodyTable[2].classList.add("hide");
    bodyTable[3].classList.add("hide");
}
