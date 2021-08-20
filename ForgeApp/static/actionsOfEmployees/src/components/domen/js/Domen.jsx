import React from "react";

import '../css/Domen.css'

class Domen extends React.Component{

    constructor(props){
        super(props)
    }


    render(){
        return (
            <div className="domen-container">
                <span id="domen">
                    {this.props.domen}
                </span>
            </div>
        )
    }
}

export default Domen;