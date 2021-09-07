import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import "../css/Body.css";

export default function Body(props){
    
    const[isDisabled, setIsDisabled] = useState(true);

    const pathToUserInfo = props.actionsOfEmployee.user;

    const pathToUserActions = props.actionsOfEmployee.datas;

    function onClickComments(event){
        event.preventDefault();
        props.setDisplay(<div>{pathToUserInfo.accountName}Comments</div>);
    }
    
    function onClickCommits(event){
        event.preventDefault(<div>{pathToUserInfo.accountName}Commits</div>);
        props.setDisplay();
    }
    
    function onClickCommentsOfCommits(event){
        event.preventDefault();
        props.setDisplay(<div>{pathToUserInfo.accountName}CommentsOfCommits</div>);
    }
    
    function onClickPullRequests(event){
        event.preventDefault();
        props.setDisplay(<div>{pathToUserInfo.accountName}PullRequests</div>);
    }
    
    function onClickCommentsOfPullRequests(event){
        event.preventDefault();
        props.setDisplay(<div>{pathToUserInfo.accountName}CommentsOfPullRequests</div>);
    }
    
    function onClickEditsOfPage(event){
        event.preventDefault();
        props.setDisplay(<div>{pathToUserInfo.accountName}EditsOfPage</div>);
    }
    
    
    function onClickCommentsOfPages(event){
        event.preventDefault();
        props.setDisplay(<div>{pathToUserInfo.accountName}CommentsOfPages</div>);
    }
    
    function onClickEditsOfBlogs(event){
        event.preventDefault();
        props.setDisplay(<div>{pathToUserInfo.accountName}EditsOfBlogs</div>);

    }
    
    function onClickCommentsOfBlogs(event){
        event.preventDefault();
        props.setDisplay(<div>{pathToUserInfo.accountName}CommentsOfBlogs</div>);
    }
    
    return (
        <label class='body' >
            <div className="wrapper">
                <span className="numOfEmplyees" id="numOfEmplyees">{props.index + 1}</span>
            </div>
            <div className="wrapper">
                <img class='image' src={pathToUserInfo.accountAvatar} />
            </div>
            <label className='wrapper accountName'>{pathToUserInfo.accountName}<button className="body-btn" disabled={isDisabled}/></label>
            <label className='wrapper numComments'>{props.actionsOfEmployee.datas.comments.numOfComments}<button className="body-btn" onClick={onClickComments}  disabled={isDisabled}/></label>
            <label className='wrapper numCommits'>{pathToUserActions.commits.numOfCommits}<button className="body-btn"  onClick={onClickCommits} disabled={isDisabled}/></label>
            <label className='wrapper numCommentsOfCommits'>{pathToUserActions.commentsOfCommits.numCommentsOfCommits}<button className="body-btn" onClick={onClickCommentsOfCommits} disabled={isDisabled}/></label>
            <label className='wrapper numpullRequests'>{pathToUserActions.pullRequests.numOfPullRequests}<button className="body-btn"  onClick={onClickPullRequests} disabled={isDisabled}/></label>
            <label className='wrapper numCommentsOfPullRequests'>{pathToUserActions.commentsOfPullRequests.numCommentsOfPullRequests}<button className="body-btn"  onClick={onClickCommentsOfPullRequests} disabled={isDisabled}/></label>
            <label className='wrapper numEditsOfPage'>{pathToUserActions.editsPages.numOfEditsPages}<button className="body-btn"  onClick={onClickEditsOfPage} disabled={isDisabled}/></label>
            <label className='wrapper numCommentsOfPages'>{pathToUserActions.commentsPages.numOfCommentsPages}<button className="body-btn" onClick={onClickCommentsOfPages} disabled={isDisabled}/></label>
            <label className='wrapper numEditsOfBlogs'>{pathToUserActions.editsBlogPosts.numOfEditsBlogPosts}<button className="body-btn" onClick={onClickEditsOfBlogs} disabled={isDisabled}/></label>
            <label className='wrapper numCommentsOfBlogs'>{pathToUserActions.commentsBlogPosts.numOfCommentsBlogPosts}<button className="body-btn" onClick={onClickCommentsOfBlogs} disabled={isDisabled}/></label>
        </label>
    )
}

