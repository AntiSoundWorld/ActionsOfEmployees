import React from 'react'

import Logout from '../../logout/js/Logout';
import RangeDates from "../../ranges/rangeDates/js/RangeDates";
import Search from "../../ranges/search/js/Search";
import Table from "../../tableComp/table/js/Table";
import UpdateDatas from "../../updateDatas/js/Update";
import Domen from '../../domen/js/Domen'

import '../css/InfoPage.css';

export default function InfoPage(props){

    return (
        <div className="infoPage">
            <div class="container-logout">
                <Domen domen={props.domen}/>
                <Logout class="container-logout" setIsLogout={props.setIsLogout} />
            </div>
            <div className="ranges">
                <Search actionsOfEmployees={props.actionsOfEmployees} setNewList={props.setNewList} />
                <RangeDates dates={props.dates} setDates={props.setDates} setIsTrigerExist={props.setIsTrigerExist} />
            </div>
            <div class="update">
                <UpdateDatas setIsTrigerExist={props.setIsTrigerExist} dates={props.dates}/>
            </div>

            <div className="table-form">
                <Table actionsOfEmployees={props.newList}/>
            </div>
        </div>
    )
} 