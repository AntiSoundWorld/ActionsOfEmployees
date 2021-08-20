import React from 'react'
import ReactDOM from 'react-dom'

import "../css/Body.css";

export default function Body(props){

    return (
        <tbody>
        <tr class='body'>
            <td>
                <img class='image' src={props.user.accountAvatar}></img>
            </td>
            <td class='accountName'>{props.user.accountName}</td>
            <td class='numOfComments'>{props.user.numOfComments}</td>
            <td class='numOfCommits'>{props.user.numOfCommits}</td>
            <td class='numOfpullRequests'>{props.user.numOfpullRequests}</td>
        </tr>
    </tbody>
    )
}