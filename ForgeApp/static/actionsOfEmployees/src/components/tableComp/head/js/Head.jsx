import React from 'react'
import ReactDOM from 'react-dom'
import NumOfEmployees from '../../../numOfEployees/js/NumOfEmployees';
import UpdateDatas from '../../../updateDatas/js/Update';

import '../css/Head.css';

export default function Head(props){

    return (
        <div id='head'>
                <span className="wrapper" id="numOfEmployees">{props.numOfEmployees}</span>
                <div className='wrapper ico'>Avatar</div>
                <div className='wrapper name'>Name</div>
                <div className='wrapper jira_comments'>Comments</div>
                <div className='wrapper bitBucket_Commits'>Commits</div>
                <div className='wrapper bitBucket_comments_of_commits'>Commits comments</div>
                <div className='wrapper bitBucket_PullRequests'>PullRequest</div>
                <div className='wrapper bitBucket_comments_of_pullRequests'>PullRequest comments</div>
                <div className='wrapper confluence_edits_pages'>Pages edits</div>
                <div className='wrapper confluence_comments_pages'>Pages comments</div>
                <div className='wrapper confluence_edits_blogs'>BlogPosts edits</div>
                <div className='wrapper confluence_comments_blogs'>BlogPosts comments</div>
                <div className="wrapper">
                <UpdateDatas className="row-account-tech-info" setIsTrigerExist={props.setIsTrigerExist} dates={props.dates}/>
                </div>
        </div>
)
}