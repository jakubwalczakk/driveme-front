import React, {Component} from 'react';

class Label extends Component{
    render(){
        return(
            <div>
                <label id={this.props.id} class={this.props.class} htmlFor={this.props.for}>{this.props.text}</label>
            </div>
        );
    }
}

export default Label;