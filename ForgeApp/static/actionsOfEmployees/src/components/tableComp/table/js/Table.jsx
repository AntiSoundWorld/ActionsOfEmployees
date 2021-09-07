import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Arrow from '../../../arrow/js/Arrow';
import Loading from '../../../loading/js/Loading';

import Body from "../../body/js/Body";
import Head from "../../head/js/Head";

import "../css/Table.css"

export default function Table(props){
    
    const[style , setStyle] = useState({position: 'relative',width: '100%', height: '', overflow: 'auto', top: ''});

    useEffect(() => {

        setTimeout(() => {

            const size =  window.screen.height;
            const markerSize = document.getElementById('marker').clientHeight;
            
            setStyle(prev => ({
                ...prev,
                height: `${size - (size * 0.44) - markerSize}px`
            }))
            
        }, 0);
    },[props.isArrowChecked])

    return (
        <div className="table">
                <Head numOfEmployees={props.numOfEmployees} setIsTrigerExist={props.setIsTrigerExist} dates={props.dates}/>
                <div id="table-scroll" style={style}>
                    {props.actionsOfEmployees.map((actionsOfEmployee, index) => (
                        
                    <Body setDisplay={props.setDisplay} actionsOfEmployee={actionsOfEmployee} index={index}/>
                ))}
                </div>
            </div>
    )
}