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
                <th class='confluence_edits_pages'>Confluence editsPages</th>
                <th class='confluence_comments_pages'>Confluence commentsPages</th>
                <th class='confluence_edits_blogs'>Confluence editBlogs</th>
                <th class='confluence_comments_blogs'>Confluence commentsBlogs</th>
            </tr>
        </thead>
    )
}