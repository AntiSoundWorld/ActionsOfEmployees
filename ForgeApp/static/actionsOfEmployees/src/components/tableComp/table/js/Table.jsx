import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Loading from '../../../loading/js/Loading';

import Body from "../../body/js/Body";
import Head from "../../head/js/Head";

import "../css/Table.css"

export default function Table(props){

    const[body, setBody] = useState(props.actionsOfEmployees);

    useEffect(() => {
        
        if(body.length === 0){
            setBody(<Loading />);
        }

        if(props.actionsOfEmployees.length !== 0){
            setBody(<div></div>);
        }
    }, [props.actionsOfEmployees]);

    return (
        <table className="table">
            <Head />
            {props.actionsOfEmployees.map(user => (
                
            <Body user={user}/>
            ))}
            {body}
        </table>
    )
}