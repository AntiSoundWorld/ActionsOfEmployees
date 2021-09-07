import { useState } from 'react';

import '../css/Contest.css';

export default function Contest(props){

    const[stateAll, setStateAll] = useState('clicked');
    const[stateTop, setStateTop] = useState('notClicked');
    const[stateLazy, setStateLazy] = useState('notClicked');
    
    function OnClickAll(){
        
        if(props.actionsOfEmployees.length === 0){

            return;
        }

        props.setNewList(Range(props.actionsOfEmployees));

        if(stateAll === 'notClicked'){

            setStateAll('clicked');

            setStateLazy('notClicked');

            setStateTop('notClicked');
        }
    }
    function OnClickTop(){

        if(props.actionsOfEmployees.length === 0){

            return;
        }

        props.setNewList(Range(props.actionsOfEmployees).slice(0, 3));

        if(stateTop === 'notClicked'){

            setStateTop('clicked');

            setStateAll('notClicked');

            setStateLazy('notClicked');
        }
    }

    function OnClickLazy(){

        if(props.actionsOfEmployees.length === 0){

            return;
        }

        let ranges = Range(props.actionsOfEmployees)
        props.setNewList(ranges.slice(ranges.length - 3));

        if(stateLazy === 'notClicked'){

            setStateLazy('clicked');

            setStateTop('notClicked');

            setStateAll('notClicked');
        }
    }
    return(
        <div>
            <button className={`contest-btn ${stateAll}`} id="btn-all" onClick={OnClickAll}>All</button>
            <button className={`contest-btn ${stateTop}`}  id="btn-top" onClick={OnClickTop}>Top-3</button>
            <button className={`contest-btn ${stateLazy}`} id="btn-lazy"onClick={OnClickLazy}>Lazy-3</button>
        </div>
    )
}

function Range(users){

    if(users === null){
        return
    }
    class ListNode {
        constructor(data) {
            this.id = 0;
            this.data = data;
            this.next = null;
        }
    }

    let ranges = new ListNode(null);

    users.forEach(user => {
        if (ranges.data === null) {

            ranges.data = user;
            
            return;
        }
        
        let pointer = ranges;

        while (pointer !== null) {

            if (user.datas.numOfActions > pointer.data.datas.numOfActions) {
                
                let node = new ListNode();
                
                node.data = user;
                
                node.next = pointer;
                
                pointer = node;
                
                return
            }
            

            if (user.datas.numOfActions <= pointer.data.datas.numOfActions && pointer.next === null) {
               
                let node = new ListNode();
                node.id = pointer.id + 1;
                node.data = user;

                pointer.next = node;
                return

            }

            if (user.datas.numOfActions < pointer.data.datas.numOfActions && pointer.next !== null) {

                if (user.datas.numOfActions > pointer.next.data.datas.numOfActions) {
               
                    let node = new ListNode();

                    node.data = user;

                    node.id = pointer.next.id

                    node.next = pointer.next;

                    node.next.id = node.id ++;
    
                    pointer.next = node;
                    return

                }
                
            }
            pointer = pointer.next;
        }
    })

    let pointer = ranges;

    const top = [];
    while (pointer !== null) {
        
        top.push(pointer.data);
        pointer = pointer.next
    } 

    return top;
}
