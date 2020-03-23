import React, { Component } from 'react';
import './TodoApp.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';
import { InputLabel, TextField, Fab, Select, MenuItem } from '@material-ui/core';

export class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = { description: '', status: "", dueDate: moment(), responsibleEmail: '', indicatedUser: null };
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleResponsibleEmailChange = this.handleResponsibleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render() {

        return (
            <div className="App">
                <form onSubmit={this.handleSubmit} className="todo-form">
                    <h3>New Task</h3>
                    <InputLabel htmlFor="description" className="right-margin">
                        Description:
                    </InputLabel>

                    <TextField
                        id="description"
                        onChange={this.handleDescriptionChange}
                        value={this.state.description}>
                    </TextField>

                    <br />
                    <br />

                    <InputLabel htmlFor="responsibleEmail" className="right-margin">
                        Responsible Email:
                    </InputLabel>

                    <TextField
                        id="responsibleEmail"
                        onChange={this.handleResponsibleEmailChange}
                        value={this.state.responsibleEmail}>
                    </TextField>

                    <br />
                    <br />
                    <InputLabel htmlFor="status" className="right-margin">
                        Status:
                    </InputLabel>
                    <Select
                        id="status"
                        value={this.state.status}
                        onChange={this.handleStatusChange}
                    >
                        <MenuItem value={"IN_PROGRESS"}>in progress</MenuItem>
                        <MenuItem value={"COMPLETED"}>completed</MenuItem>
                        <MenuItem value={"READY"}>ready</MenuItem>
                        <MenuItem value={"NO_STATUS"}>unknown</MenuItem>
                    </Select>
                    <br />
                    <br />

                    <DatePicker
                        id="due-date"
                        selected={this.state.dueDate}
                        placeholderText="Due date"
                        onChange={this.handleDateChange}>
                    </DatePicker>
                    <br />
                    <Fab type="submit" variant="round" size="small" className="fab">
                        <CheckIcon />
                    </Fab>
                </form>
                <br />
                <br />
            </div>
        );
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleResponsibleEmailChange(e) {
        this.setState({
            responsibleEmail: e.target.value
        });
    }

    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }    

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.description.length || !this.state.status.length || !this.state.dueDate || !this.state.responsibleEmail.length) {
            return;
        }

        axios.get('http://localhost:8080/api/users/email/' + this.state.responsibleEmail, {
            "headers": { "authorization": "Bearer " + localStorage.getItem("token") }
        })
            .then(response => {
                if (response.data !== null) {
                    axios.post('http://localhost:8080/api/tasks/',
                        {
                            description: this.state.description,
                            status: this.state.status,
                            dueDate: this.state.dueDate,
                            user: response.data,
                            id: ""
                        },
                        {
                            "headers": { "authorization": "Bearer " + localStorage.getItem("token") }
                        })
                        .then(res => {
                            window.location.href = "/";
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }

            })
            .catch(error => {
                console.log(error);
            });
    }

}