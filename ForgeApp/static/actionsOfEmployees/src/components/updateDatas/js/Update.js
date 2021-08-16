import defaultDates from '../../../tools/tools';
import React from 'react'
import ReactDOM from 'react-dom'
import '../css/Update.css'

export default function UpdateDatas(props){

    function Update(){
        props.setIsTrigerExist(false);
    }
    
    return (
        <button id='updateDatas' onclick={Update}>Update</button>
    )
}


// setTimeout(() => {

//     let button = document.getElementById("updateDatas");
    
//     let userDateEnd = document.getElementById("end").value;
    
//     let actualDateEnd = defaultDates().dates.end;
    
//     if(userDateEnd !== actualDateEnd){
//         button.disabled = true;
//     }
// }, 0);