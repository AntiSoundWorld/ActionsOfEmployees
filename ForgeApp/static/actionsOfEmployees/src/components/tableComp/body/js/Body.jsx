import React from 'react'
import ReactDOM from 'react-dom'

import "../css/Body.css";

export default function Body(props){

    console.log(props)
    return (
        <tbody>
        <tr class='body'>
            <td>
                <img class='image' src={props.user.accountAvatar} />
            </td>
            <td class='accountName'>{props.user.accountName}</td>
            <td class='numComments'>{props.user.numOfComments}</td>
            <td class='numCommits'>{props.user.numOfCommits}</td>
            <td class='numCommentsOfCommits'>{props.user.numCommentsOfCommits}</td>
            <td class='numpullRequests'>{props.user.numOfpullRequests}</td>
            <td class='numCommentsOfPages'>{props.user.numCommentsOfPages}</td>
            <td class='numCommentsOfBlogs'>{props.user.numCommentsOfBlogs}</td>
        </tr>
    </tbody>
    )
}