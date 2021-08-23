import React from 'react'

import AccessBitBucket from "../accessBitBucket/js/AccessBitBucket";
import AccessConfluence from '../accessesConfluence/js/AccessConfluence';
import AccessJira from "../accessJira/js/AccessJira";

import "../css/Accesses.css";

export default function Accesses(props){

    return(
        <div class="labels-Access">
            <AccessConfluence isConluenceAccessExist={props.accesses.isConfluenceAccessExist} state={props.state}/>
            <AccessBitBucket isBitBucketAccessExist={props.accesses.isBitBucketAccessExist} state={props.state}/>
            <AccessJira isJiraAccessExist={props.accesses.isJiraAccessExist} state={props.state}/>
      </div>
    )
}

