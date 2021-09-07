import { useState } from 'react'
import '../css/Arrow.css'

export default function Arrow(props){

    const[arrowClass, setArrowClass] = useState("arrow up");
    function OnSubmit(event){

        props.setRangePosition(prev =>{
            
            if(props.isArrowChecked === false){

                props.setIsArrowChecked(true)
                
                setArrowClass("arrow down");

                return {
                    display: 'inline-flex',
                    height: '30px'
                }
            }
            else{
                props.setIsArrowChecked(false)

                setArrowClass("arrow up")

                return {
                    display:'',
                    height: "150px"
                }
            }
        })

        // console.log(document.getElementById('table-scroll').clientHeight)
    }
    return (
            <label id="arrow-label"><i class={arrowClass}></i>
                <button className="arrow-btn" onClick={OnSubmit}></button>
            </label>
    )
}