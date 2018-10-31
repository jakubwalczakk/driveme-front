import React, { Component } from 'react';

class Input extends Component {
    render() {
        return (
            <div>
                <input
                    id={this.props.id}
                    class={this.props.class}
                    type={this.props.type}
                    onChange={this.props.onChange}
                    minLength={this.props.minLength}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}

export default Input;