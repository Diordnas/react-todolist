import React, { Component } from 'react'

export class AddTodo extends Component {
    render() {
        return (
            <div style = {{margin: "10px"}}>
                <button className = "addButton" onClick={this.props.openMenu}>Add a To-Do
                </button>
            </div>
        )
    }
}

export default AddTodo
