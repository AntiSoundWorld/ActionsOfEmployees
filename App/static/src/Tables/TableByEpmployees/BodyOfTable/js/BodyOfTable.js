import React from 'react';
import './../css/BodyOfTable.css'

export function BodyOfTable(props){
    
 
    return (
        <tr className='body'>
             <td>
                <img className='image' src={props.macket.accountAvatar}></img>
            </td>
            <td className='accountName'>{props.macket.accountName}</td>
            <td className='numOfComments'>{props.macket.numOfComments}</td>
            <td className='numOfCommits'>{props.macket.numOfCommits}</td>
            <td className='numOfpullRequests'>{props.macket.numOfpullRequests}</td>
        </tr>
    ) 
}