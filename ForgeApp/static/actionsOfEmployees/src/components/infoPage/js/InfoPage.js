import React from 'react'

import RangeDates from "../../ranges/rangeDates/js/RangeDates";
import Search from "../../ranges/search/Search";
import Table from "../../tableComp/table/js/Table";
import UpdateDatas from "../../updateDatas/js/Update";

export default function InfoPage(props){

    return (
        <div>
            <Search actionsOfEmployees={props.actionsOfEmployees} setNewList={props.setNewList} />
            <RangeDates dates={props.dates} setDates={props.setDates} setIsTrigerExist={props.setIsTrigerExist} />
            <Table actionsOfEmployees={props.newList}/>
            <UpdateDatas setIsTrigerExist={props.setIsTrigerExist} dates={props.dates}/>
        </div>
    )
} 