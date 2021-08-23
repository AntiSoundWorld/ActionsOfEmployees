import React from 'react'
import ReactDOM from 'react-dom'

import "../css/Body.css";

export default function Body(props){

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
        </tr>
    </tbody>
    )
}