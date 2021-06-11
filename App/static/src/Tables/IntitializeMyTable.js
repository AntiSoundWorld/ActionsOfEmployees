import React from 'react';
import { BodyOfTable } from './TableByEpmployees/BodyOfTable/js/BodyOfTable';
import { HeadOfTable } from './TableByEpmployees/HeadOfTable/js/HeadOfTable'
import './InitializeMyTable.css'

export function InitializedMyTable(props){
    return (
        <table className="table">
            <HeadOfTable />
                {props.macket.map((macket, index) => (
                    <BodyOfTable macket={macket} index={index}/>  
            ))}
        </table>
    )
}