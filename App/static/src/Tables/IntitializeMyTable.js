import React, {useState, useEffect} from 'react';
import { BodyOfTable } from './TableByEpmployees/BodyOfTable/js/BodyOfTable';
import { HeadOfTable } from './TableByEpmployees/HeadOfTable/js/HeadOfTable'
import './InitializeMyTable.css';
import LoadingScreen from '../LoadingScreen/js/LoadingScreen';

export function InitializedMyTable(props){
    
    const[loading, setLoading] = useState(<LoadingScreen />);

    setTimeout(() => {
        setLoading(null);
    }, 6000);

    return (
        <table className="table">
            <HeadOfTable />
                {props.macket.map((macket, index) => (
                    <BodyOfTable macket={macket} index={index}/>  
            ))}
            {loading}
        </table>
    )
}