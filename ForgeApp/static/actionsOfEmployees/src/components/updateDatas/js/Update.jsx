import React, { useEffect } from 'react';
import defaultDates from '../../../tools/tools';
import updateImage from '../../../assets/update.png'
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
        <button id='updateDatas' onClick={Update}><img id="update-image" src={updateImage}/></button>
    )
}

