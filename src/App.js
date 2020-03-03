import React, {Component} from 'react';
import logo from './components/logo.svg';
import './App.css';
import { Login } from './components/Login';
import { TaskPlannerApp } from './components/TaskPlannerApp';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { NewTask } from './components/NewTask';

export default class App extends Component {

    constructor(){
        super();
        let storage = JSON.parse(localStorage.getItem("admin"))
        if (!storage) {
            localStorage.setItem('admin', JSON.stringify({"password":'admin'}));
        } 
        
    }

    render() {
        
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Task Planner</h1>
                    </header>
                    <br/>
                    <br/>
                    <div>
                        <Switch>
                            <Route exact path = "/" component = {mainView}/>    
                            <Route exact path = "/newTask" component = {newTask}/>
                        </Switch>                        
                    </div>
                </div>
            </Router>
        );
    }
}

const mainView = () => (
    <div>
        {localStorage.getItem('isLogged') === 'true' ? <TaskPlannerApp /> : <Login />}        
    </div>
    
);

const newTask = () => (
    <NewTask />   
);