import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import './Login.css'


export class Login extends React.Component {

    clickHandler = (e) => {
        e.preventDefault();
        var email = document.querySelector('#email').value;
        var pass = document.querySelector('#password').value;
        axios.post('http://localhost:8080/login', {
            email: email,
            password: pass
        })
            .then(response => {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("isLogged", JSON.stringify({ "loggedIn": 'true', "user": jwt.decode(response.data.accessToken).sub }));
            })
            .catch(error => {
                console.log(error);
            });
        window.location.href = "/";
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <Avatar className="avatar">
                            <LockIcon />
                        </Avatar>
                        <Typography variant="h2">Sign in</Typography>
                        <form className="form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                onClick={this.clickHandler}
                            >
                                Sign in
                            </Button>
                        </form>
                        <br />
                        <Typography>Create Account</Typography>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}