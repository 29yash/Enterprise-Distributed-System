import React, { Component } from 'react';
import './Button.css';

class CalButton extends Component {

 value = null;
 size = null;
 type = null ;

    constructor(props){
        super(props);
        this.value = this.props.value;
        this.size = this.props.size ? this.props.size : "small";
        this.type = this.props.type ? this.props.type : "number";

    }

    render(){
        return (
            <button onClick={()=>{this.clicked()}} className={this.type === 'operation'? 'Button-area-operation': 'Button-area-number'}>
                <h4>{this.value}</h4>
            </button>
        );
    }

    clicked(){
        this.props.onClick(this.props.value);
    }

}

export default CalButton;