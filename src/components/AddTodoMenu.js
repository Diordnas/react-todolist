import React, { Component } from 'react'

export class AddTodoMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }
    
    render() {
        if(this.props.state.addTodoMenuOpen === true){
            return (
                <div className="popUp">
                    <div style={{overflow: "hidden"}}>
                        <p className="popupHeader">Add a To-Do</p>
                        <button className="closeP" onClick = {this.props.closeMenu}>
                            <i className="large material-icons icon closeIcon">close</i>
                        </button>
                    </div>
                    
                    <div>
                        <form>
                        <div>
                            <p style={{display: "inline-block"}}>Name:</p>
                            <input name = "name" className="popUpInput popUpNameInput" onChange={this.handleChange}></input>
                        </div>
                        <div className="popUpDates">
                            <p>Start Date:</p>
                            <input name = "startDate" className="popUpInput" type="datetime-local" onChange={this.handleChange}></input>
                            <p>End Date:</p>
                            <input name = "endDate" className="popUpInput" type="datetime-local" onChange={this.handleChange}></input>
                        </div>
                        <input className="confirmButton" type = "button" value="Confirm" onClick={() => this.props.addTodo(this.state)}></input>
                        </form>
                        
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default AddTodoMenu
