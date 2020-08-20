import React, { Component } from 'react'

export class AddEventMenu extends Component {
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
        if(this.props.state.addEventMenuOpen === true){
            return (
                <div className="popUp">
                    <div style={{overflow: "hidden"}}>
                        <p className="popupHeader">Add an Event</p>
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
                            <p>Date:</p>
                            <input name = "date" className="popUpInput" type="date" onChange={this.handleChange}></input>
                        </div>
                        <input className="confirmButton" type = "button" value="Confirm" onClick={() => this.props.addEvent(this.state)}></input>
                        </form>
                        
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default AddEventMenu
