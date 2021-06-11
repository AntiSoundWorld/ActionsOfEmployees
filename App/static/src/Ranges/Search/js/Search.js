import React, { useState } from 'react';
import { correctFilter } from '../correctFilter';
import './../css/Search.css'

function Search(props){
    
    async function search(){

       
        let search = document.getElementById('searchEmployee').value;
        
        if(search.length === 0){
            props.setListOfUsers(props.usersInfo);
            return;
        }

        props.setListOfUsers(correctFilter(props.usersInfo, search));
    }

    return(
        <input id="searchEmployee" label="Search Employee" name="name" placeholder='Search' onInput={search}/>
    )
}


export default Search;