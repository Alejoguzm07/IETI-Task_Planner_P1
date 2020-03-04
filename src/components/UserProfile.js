import React, {Component} from 'react';
import { Typography, Fab, TextField } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

export class UserProfile extends Component {

    constructor(props) {
        super(props);
        let email = JSON.parse(localStorage.getItem("isLogged")).user
        this.state = {
            user: JSON.parse(localStorage.getItem(email)),
            name: "", email: "", password: "", confirmPassword:""
        }
        this.state.user.email = email
    }
    handleEmailField = () => event => {
        this.setState({email: event.target.value})
    }

    handleNameField = () => event => {
        this.setState({name: event.target.value})
    }

    handlePasswordField = () => event => {
        console.log(event.value)
        this.setState({password: event.target.value})
    }

    handleConfirmPasswordField = () => event => {
        this.setState({confirmPassword: event.target.value})
    }

    handleSubmit = () => event => {
        console.log(this.state)
    }

    render() {
        return (
            <div className="App">
                <Typography variant="h2">User Profile</Typography>
                <TextField label="email" defaultValue={this.state.user.email} onChange={this.handleEmailField()}/> <br/>
                <TextField label="name" defaultValue={this.state.user.fullname} onChange={this.handleNameField()}/> <br/>
                <TextField label="password" type="password"/> <br/>
                <TextField label="confirm password" type="password"/> <br/>
                <Fab type = "submit" size="small" onClick={this.handleSubmit()}>
                    <CheckIcon fontSize="small"/>
                </Fab>
            </div>
        );
    }
}

