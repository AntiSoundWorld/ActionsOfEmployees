import React from 'react'
import ReactDOM from 'react-dom'

import '../css/Head.css';

export default function Head(){

    return (
        <thead>
            <tr id='head'>
                <th class='ico'>ico</th>
                <th class='name'><span>Name</span></th>
                <th class='jira_comments'>Jira comments</th>
                <th class='bitBucket_Commits'>BitBucket Commits</th>
                <th class='bitBucket_comments_of_commits'>BitBucket CommentsOfCommits</th>
                <th class='bitBucket_PullRequests'>BitBucket PullRequests</th>
                <th class='confluence_Comments'>Confluence commentsPages</th>
                <th class='confluence_Comments'>Confluence commentsBlogs</th>
            </tr>
        </thead>
    )
}