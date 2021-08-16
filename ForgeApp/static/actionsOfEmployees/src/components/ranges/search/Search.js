
import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react';
import { correctFilter } from '../../../tools/tools.js'
import './css/Search.css'
export default function Search(props){

    function onChange(event){
        
        let newList = correctFilter(props.actionsOfEmployees, event.target.value);
        props.setNewList(newList);
    }

    return (
        <input id="searchEmployee" label="Search Employee" name="name" placeholder='Search' autocomplete="off" onChange={onChange} />
    )
}
