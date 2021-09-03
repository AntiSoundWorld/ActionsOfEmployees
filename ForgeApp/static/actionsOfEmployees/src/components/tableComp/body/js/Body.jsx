import React from 'react'
import ReactDOM from 'react-dom'

import "../css/Body.css";

export default function Body(props){
    
    return (
        <div class='body'>
            <div className="wrapper">
                <span className="numOfEmplyees" id="numOfEmplyees">{props.index + 1}</span>
            </div>
            <div className="wrapper">
                <img class='image' src={props.user.accountAvatar} />
            </div>
            <div className='wrapper accountName'>{props.user.accountName}</div>
            <div className='wrapper numComments'>{props.user.numOfComments}</div>
            <div className='wrapper numCommits'>{props.user.numOfCommits}</div>
            <div className='wrapper numCommentsOfCommits'>{props.user.numCommentsOfCommits}</div>
            <div className='wrapper numpullRequests'>{props.user.numOfpullRequests}</div>
            <div className='wrapper numCommentsOfPullRequests'>{props.user.numCommentsOfPullRequests}</div>
            <div className='wrapper numEditsOfPage'>{props.user.numOfEditsPages}</div>
            <div className='wrapper numCommentsOfPages'>{props.user.numOfCommentsPages}</div>
            <div className='wrapper numEditsOfBlogs'>{props.user.numOfEditsBlogPosts}</div>
            <div className='wrapper numCommentsOfBlogs'>{props.user.numOfCommentsBlogPosts}</div>
        </div>
    )
}