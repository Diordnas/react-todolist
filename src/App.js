import React from 'react';
import Cookies from 'universal-cookie';
import './index.css';


import Todo from './components/Todo'
import AddTodo from './components/AddTodo'
import AddTodoMenu from './components/AddTodoMenu'

import Event from './components/Event'
import AddEvent from './components/AddEvent'
import AddEventMenu from './components/AddEventMenu'

var arrayMove = require('array-move');
var moment = require('moment');
const cookies = new Cookies();

class App extends React.Component{

    state = {
      addTodoMenuOpen: false,
      todos: [],

      addEventMenuOpen: false,
      events: []
    }

    componentDidMount(){
      this.loadCookie();
    }


    loadCookie = () => {
      var cookie = cookies.get('state')
      if (cookie !== undefined){
        this.setState({
          todos: cookie
        });
      }
      cookie = cookies.get('events')
      if (cookie !== undefined){
        this.setState({
          events: cookie
        });
      }      
    }

  openTodoMenu = () => {
    this.setState({
      addTodoMenuOpen: true
    });
  }

  closeTodoMenu = () => {
    this.setState(
      {
        addTodoMenuOpen: false
      }
    );
  }

  addTodo = (menuState) => {
    const name = menuState.name;
    const startDate = moment(menuState.startDate);
    const endDate = moment(menuState.endDate);
    const newTodo = {name: name, id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), startDate: startDate, endDate: endDate}
    this.setState(
    {
      addTodoMenuOpen: false,
      todos: this.state.todos.concat(newTodo)
    }
    );
    this.forceUpdate();
    cookies.set('state', JSON.stringify(this.state.todos.concat(newTodo)), {maxAge: 86400000000});
  }

  removeTodo = (id) => {
    var i = 0;
    while (i<this.state.todos.length){
      if(this.state.todos[i].id === id){
        console.log(this.state.todos[i].name)
        this.state.todos.splice(i,1);
      }
      i++;
    }
    this.forceUpdate();
    cookies.set('state', JSON.stringify(this.state.todos), {maxAge: 86400000000})
  }

  moveTodo = (id, amount) => {
    var i = 0;
    while (i<this.state.todos.length){
      if(this.state.todos[i].id === id){
        var index = i;
      }
      i++;
    }
    this.setState({
      todos: arrayMove(this.state.todos, index, index + amount)
    });
    this.forceUpdate();
  }

  openEventMenu = () => {
    this.setState({
      addEventMenuOpen: true
    });
  }

  closeEventMenu = () => {
    this.setState(
      {
        addEventMenuOpen: false
      }
    );
  }

  addEvent = (menuState) => {
    const name = menuState.name;
    const date = menuState.date
    const newEvent = {name: name, id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), date: date}

    const events = this.state.events.concat(newEvent).sort((a, b) => (a.date > b.date) ? 1 : -1)

    console.log(events)

    this.setState({
      addEventMenuOpen: false,
      events: events
    })

    this.forceUpdate();
    cookies.set('events', JSON.stringify(events), {maxAge: 86400000000});
  }

  removeEvent = (id) => {
    var i = 0;
    while (i<this.state.events.length){
      if(this.state.events[i].id === id){
        console.log(this.state.events[i].name)
        this.state.events.splice(i,1);
      }
      i++;
    }
    this.forceUpdate();
    cookies.set('events', JSON.stringify(this.state.events), {maxAge: 86400000000})
  }


  render() {

    const todos = this.state.todos.map((todo) =>
      <Todo info={todo} completionPercent={100*(moment().diff(todo.startDate)/moment(todo.endDate).diff(todo.startDate))} removeTodo = {this.removeTodo} moveTodo = {this.moveTodo}/>
    );

    const events = this.state.events.map((event) =>
      <Event info={event} removeEvent = {this.removeEvent} moveEvent = {this.moveEvent}/>
    );

    return(
      <React.Fragment>
        <div className = "mainBox">
          <h1>Events:</h1>
          {events}
          <AddEvent openMenu = {this.openEventMenu}></AddEvent>
          <AddEventMenu state = {this.state} closeMenu = {this.closeEventMenu} addEvent = {this.addEvent}/>
        </div>
  
        <div className = "mainBox" style = {{width: '70%', float: 'right', height: '90vh'}}>
          <h1>To-Dos:</h1>
          {todos}
          <AddTodo openMenu = {this.openTodoMenu}/>
          <AddTodoMenu state = {this.state} closeMenu = {this.closeTodoMenu} addTodo = {this.addTodo}/>
        </div>
        
      </React.Fragment>
    );
  }
}

export default App;