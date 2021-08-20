import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Loading from '../../../loading/js/Loading';

import Body from "../../body/js/Body";
import Head from "../../head/js/Head";

import "../css/Table.css"

export default function Table(props){


    return (
        <table className="table">
            <Head />
            {props.actionsOfEmployees.map(user => (
                
            <Body user={user}/>
            ))}
        </table>
    )
}