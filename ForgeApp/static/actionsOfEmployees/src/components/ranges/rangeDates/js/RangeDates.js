import React from 'react'
import ReactDOM from 'react-dom'

import '../css/RangeDates.css'

export default function RangeDates(props){

    function OnSubmitRange(event){
        
        event.preventDefault();

        
        let dates = {
            dates: {
                start: event.target.start.value,
                end: event.target.end.value
            }
        }
        
        props.setDates(dates);
        props.setIsTrigerExist(false);
    }

    return (
        <form id='RangeDates' style={props.rangePosition} onSubmit={OnSubmitRange}>
            <input id="start" type='date' name="start" label="Start Date" defaultValue={props.dates.start}/>
            <p></p>
            <input id="end" type='date' name="end" label="End Date" defaultValue={props.dates.end} />
            <p></p>
            <button id='range-button'>range</button>
        </form>
    )
}