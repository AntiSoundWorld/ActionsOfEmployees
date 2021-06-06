import { invoke } from '@forge/bridge';
import React, { useState } from 'react';
import './../css/Search.css'

function Search(props){
    
    async function search(){

        let search = document.getElementById('searchEmployee').value;
        
        if(search.length === 0){
            props.setListOfUsers(props.usersInfo);
            return;
        }
        window.open('./Authorize.js', '_blank')
        props.setListOfUsers(props.usersInfo.filter(userInfo => userInfo.accountName === search));
    }

    function onSubmit(event){
        event.preventDefault();
    }

    return(
        <form id='searchForm' onSubmit={onSubmit} >
            <input id="searchEmployee" label="Search Employee" name="name" placeholder='Search' onChange={event => event.target.value}/>
            <p></p>
            <button id='search-button' onClick={search} >Search</button>
        </form>
    )
}

export default Search;