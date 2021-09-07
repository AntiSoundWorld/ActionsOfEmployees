import React, { useEffect, useState } from 'react'

import Logout from '../../logout/js/Logout';
import RangeDates from "../../ranges/rangeDates/js/RangeDates";
import Search from "../../ranges/search/js/Search";
import Table from "../../tableComp/table/js/Table";
import UpdateDatas from "../../updateDatas/js/Update";
import Domen from '../../domen/js/Domen'
import SignsAtalssianProducts from '../../signsAtalssianProducts/js/SignsAtalssianProducts';

import '../css/InfoPage.css';

import Arrow from '../../arrow/js/Arrow';
import NumOfEmployees from '../../numOfEployees/js/NumOfEmployees';
import Contest from '../../contest/js/Contest';


export default function  InfoPage(props){

    const[isArrowChecked, setIsArrowChecked] = useState(false)

    const[rangePosition, setRangePosition] = useState({display: '', height: '150px'});

    const[display, setDisplay] = useState(null);

    return (
        <div className="infoPage">
            <div id="marker">
                <div class="container-logout">
                    <Domen domen={props.domen}/>
                    <Logout class="container-logout" setIsLogout={props.setIsLogout} />
                </div>
                    <div className="ranges" style={{height: rangePosition.height}}>
                        <Search actionsOfEmployees={props.actionsOfEmployees} setNewList={props.setNewList} />
                        <RangeDates rangePosition={rangePosition} dates={props.dates} setDates={props.setDates} setIsTrigerExist={props.setIsTrigerExist} />
                    </div>
                <div id="display">
                    {display}
                </div>
                <Arrow setRangePosition={setRangePosition} setIsArrowChecked={setIsArrowChecked} isArrowChecked={isArrowChecked} />
            </div>
            <Contest actionsOfEmployees={props.actionsOfEmployees} setNewList={props.setNewList}/>
            <Table setDisplay={setDisplay} actionsOfEmployees={props.newList} isArrowChecked={isArrowChecked}  numOfEmployees={props.actionsOfEmployees.length} setIsTrigerExist={props.setIsTrigerExist} dates={props.dates}/>
        </div>
)
} 