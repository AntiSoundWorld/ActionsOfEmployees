import defaultDates from '../../../tools/tools';
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import '../css/Update.css'

export default function UpdateDatas(props){
    
    useEffect(() => {

        let button = document.getElementById("updateDatas");

        if (props.dates.end !== defaultDates().dates.end) {
           
        
            button.disabled = true;

            return;
        }

        button.disabled = false;

    }, [props.dates]);

    function Update(){
        props.setIsTrigerExist(false);
    }
    
    return (
        <button id='updateDatas' onClick={Update}>Update</button>
    )
}

