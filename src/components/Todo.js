import React from 'react'
import '../index.css'

var moment = require('moment');

class Todo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentName: "",
      completionPercent: this.props.completionPercent
    };
  };

  tick(){
    const durationRemaining = moment.duration(moment(this.props.info.endDate).diff(moment()));
    var remainingTime = '';
    if (durationRemaining >= 86400000){
      remainingTime += Math.floor(durationRemaining.days()) + ' days ';
      remainingTime += Math.floor(durationRemaining.hours()) + ' hours ';
    } else if (durationRemaining >= 3600000){
      remainingTime += Math.floor(durationRemaining.hours()) + ' hours ';
      remainingTime += Math.floor(durationRemaining.minutes()) + ' minutes ';
    } else {
      remainingTime += Math.floor(durationRemaining.minutes()) + ' minutes ';
      remainingTime += Math.floor(durationRemaining.seconds()) + ' seconds ';
    }
    this.setState({
      completionPercent: 100*(moment().diff(this.props.info.startDate)/moment(this.props.info.endDate).diff(this.props.info.startDate)),
      remainingTime: remainingTime + 'remaining'
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
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <div className="itemHeader">
            <p className="itemName">{this.props.info.name}</p>

            <button className="closeP" onClick = {() => this.props.removeTodo(this.props.info.id)}>
              <i className="large material-icons icon Icon">close</i>
            </button>
            <button className="moveButton" onClick = {() => this.props.moveTodo(this.props.info.id, 1)}>
              <i className="large material-icons icon Icon">arrow_drop_down</i>
            </button>
            <button className="moveButton" onClick = {() => this.props.moveTodo(this.props.info.id, -1)}>
              <i className="large material-icons icon Icon">arrow_drop_up</i>
            </button>
            
            <br></br>
            <div className = "progressBar">
              <p className="remainingTime" style={{float: "right"}}><b>{this.state.remainingTime}</b></p>
              <div className="gradient" style = {{width:this.state.completionPercent+"%"}}></div>
            </div>
        </div>
    )
  }
}

export default Todo;