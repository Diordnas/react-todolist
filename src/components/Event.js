import React from 'react'
import '../index.css'

var moment = require('moment');

class Event extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentName: "",
      completionPercent: this.props.completionPercent
    };
  };

  tick(){
    const durationRemaining = moment.duration(moment(this.props.info.date).diff(moment()));
    this.setState({
      remainingTime: 'In ' + (Math.ceil(durationRemaining/86400000))  + ' days'
    });
  }

  componentDidUpdate(){
    if (this.state.currentName !== this.props.info.name){
      this.setState({
        currentName: this.props.info.name
      });
      this.tick();
    }
  }

  componentDidMount() {
    this.tick()
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <div className="itemHeader" style={{height:'25px'}}>
            <p className="itemName">{this.props.info.name}</p>
            

            <button className="closeP" onClick = {() => this.props.removeEvent(this.props.info.id)}>
              <i className="large material-icons icon Icon">close</i>
            </button>
            <p className="itemName" style={{float: "right", marginRight: '10px'}}>{this.state.remainingTime}</p>
        </div>
    )
  }
}

export default Event;