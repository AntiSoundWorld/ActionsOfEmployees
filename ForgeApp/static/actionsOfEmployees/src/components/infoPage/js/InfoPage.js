import React from 'react'

import RangeDates from "../../ranges/rangeDates/js/RangeDates";
import Search from "../../ranges/search/Search";
import Table from "../../tableComp/table/js/Table";
import UpdateDatas from "../../updateDatas/js/Update";

export default function InfoPage(props){

    return (
        <div>
            <Search actionsOfEmployees={props.actionsOfEmployees} setNewList={props.setNewList} />
            <RangeDates dates={props.dates} setDates={props.setDates} setNewList={props.setNewList} />
            <Table actionsOfEmployees={props.newList}/>
            <UpdateDatas setIsTrigerExist={props.setIsTrigerExist}/>
        </div>
    )
} 