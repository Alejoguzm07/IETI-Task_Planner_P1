import React, {Component} from 'react';
import { Typography, Fab, TextField } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { SnackbarContent } from '@material-ui/core';

export class Filter extends Component {

    constructor(props) {
        super(props);
        let email = JSON.parse(localStorage.getItem("isLogged")).user
        this.state = {
            user: JSON.parse(localStorage.getItem(email)),
            name: "", email: "", password: "", confirmPassword:"",
            alert: false, alertMessage:""
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
        this.setState({password: event.target.value})
    }

    handleConfirmPasswordField = () => event => {
        this.setState({confirmPassword: event.target.value})
    }

    throwAlert = (message) => {
        this.setState({alertMessage:message, alert:true})
    }

    closeAlert = () => {
        this.setState({alert: false})
    }

    handleSubmit = () => event => {
        let newUser = this.state.user
        if (this.state.password !== "" || this.state.confirmPassword !== "") {
            if (this.state.password !== this.state.confirmPassword) {
                this.throwAlert("The passwords do not match")
                return
            } else {
                newUser.password = this.state.password
            }            
        } else {
            newUser.password = this.state.user.password
        }

        if (this.state.name !== "") {
            newUser.name = this.state.name
        } else {
            newUser.name = this.state.user.name
        }

        if (this.state.email !== "") {
            newUser.email = this.state.email
            localStorage.setItem("isLogged", JSON.stringify({"loggedIn":'true',"user":this.state.email}));
            localStorage.removeItem(this.state.user.email)
        } else {
            newUser.email = this.state.user.email
        }
        localStorage.setItem(newUser.email, JSON.stringify({"password":newUser.password, "fullname":newUser.name}));
        window.location.href = "/";
    }

    render() {
        return (
            <div className="App">
                <Snackbar open={this.state.alert} autoHideDuration={6000} onClose={this.closeAlert}>
                    <SnackbarContent message={this.state.alertMessage}></SnackbarContent>
                </Snackbar>
                <Typography variant="h2">User Profile</Typography>
                <TextField label="email" defaultValue={this.state.user.email} onChange={this.handleEmailField()}/> <br/>
                <TextField label="name" defaultValue={this.state.user.fullname} onChange={this.handleNameField()}/> <br/>
                <TextField label="password" defaultValue={this.state.user.password} type="password" onChange={this.handlePasswordField()}/> <br/>
                <TextField defaultValue={this.state.user.password} label="confirm password" type="password" onChange={this.handleConfirmPasswordField()}/> <br/>
                <Fab type = "submit" size="small" onClick={this.handleSubmit()}>
                    <CheckIcon fontSize="small"/>
                </Fab>
            </div>
        );
    }
}