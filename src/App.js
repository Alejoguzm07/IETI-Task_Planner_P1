import React, {Component} from 'react';
import logo from './components/logo.svg';
import './App.css';
import { Login } from './components/Login';
import { UserProfile } from "./components/UserProfile";
import { TaskPlannerApp } from './components/TaskPlannerApp';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { NewTask } from './components/NewTask';

export default class App extends Component {

    constructor(){
        super();
        let storage = JSON.parse(localStorage.getItem("isLogged"))
        if (!storage) {
            localStorage.setItem('admin', JSON.stringify({"password":'admin', "fullname":"administrador"}));
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
                            <Route exact path = "/userProfile" component = {userProfile}/>
                        </Switch>                        
                    </div>
                </div>
            </Router>
        );
    }
}

const mainView = () => {
    let storage = JSON.parse(localStorage.getItem('isLogged'))
    if (storage === null) {
        storage = {"isLogged":"false"}
    }
    return (
        <div>            
            {storage.loggedIn === 'true' ? <TaskPlannerApp /> : <Login />}
        </div>
    )
    
}    

const newTask = () => (
    <NewTask />   
);

const userProfile = () => (
    <UserProfile />   
);