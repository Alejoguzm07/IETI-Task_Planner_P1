import React, {Component} from 'react';
import logo from './components/logo.svg';
import './App.css';
import { Login } from './components/Login';
import { TodoApp } from './components/TodoApp';
import {BrowserRouter as Router,Route} from 'react-router-dom'

class App extends Component {

    constructor(){
        super();
        localStorage.setItem('admin', "Root-root1");
        localStorage.setItem("isLogged", false);
    }

    render() {
        var vista;
        var logged = localStorage.getItem("isLogged");
        if(logged === true) {
            vista =  <Route path="/todo" component={TodoAppView}/>            
        } else {
            vista = <Route exact path="/" component={LoginView}/>
        }
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
                        {vista}                        
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

const LoginView = () => (
    <Login/>
);

const TodoAppView = () => (
    <TodoApp/>
);