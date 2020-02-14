import React, {Component} from 'react';
import logo from './components/logo.svg';
import './App.css';
import { Login } from './components/Login';
import { TodoApp } from './components/TodoApp';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

export default class App extends Component {

    constructor(){
        super();
        localStorage.setItem('admin', 'admin');
    }

    render() {
        
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">TODO React App</h1>
                    </header>
                    <br/>
                    <br/>
                    <div>
                        <Switch>
                            <Route exact path = "/" component = {mainView}/>    
                        </Switch>                        
                    </div>
                </div>
            </Router>
        );
    }
}

const mainView = () => (
    <div>
        {localStorage.getItem('isLogged') === 'true' ? <TodoApp /> : <Login />}        
    </div>
    
);