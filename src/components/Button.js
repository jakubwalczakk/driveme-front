import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <div>
                <button
                    id={this.props.id}
                    class={this.props.class}
                    onClick={this.props.handleClick}
                    color={this.props.color}>
                    {this.props.text}
                </button>
            </div>);
    }
}

export default Button;