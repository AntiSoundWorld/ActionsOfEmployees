import React from 'react';

import './../css/HeadOfTable.css'

export function HeadOfTable(){

    return(
        <tr id='head'>
            <th className=''></th>
            <th className='name'><text>Name</text></th>
            <th className='jira_comments'>Jira comments</th>
            <th className='bitBucket_Commits'>BitBucket Commits</th>
            <th className='bitBucket_PullRequests'>BitBucket PullRequests</th>
        </tr>
    );
}