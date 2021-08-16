import React from 'react'

import AccessBitBucket from "../accessBitBucket/js/AccessBitBucket";
import AccessJira from "../accessJira/js/AccessJira";

import "../css/Accesses.css";

export default function Accesses(props){

    return(
        <div class="labels-Access">
           
            <AccessBitBucket isBitBucketAccessExist={props.accesses.isBitBucketAccessExist} state={props.state}/>
            <AccessJira isJiraAccessExist={props.accesses.isJiraAccessExist} state={props.state}/>
      </div>
    )
}

