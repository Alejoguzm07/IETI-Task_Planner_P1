import React, {Component} from 'react';
import './TodoApp.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import CheckIcon from '@material-ui/icons/Check';
import { InputLabel, TextField, Fab } from '@material-ui/core';

export class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {description: '', status: "in progress", dueDate: moment(), responsibleName: '' , responsibleEmail: ''};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleResponsibleNameChange = this.handleResponsibleNameChange.bind(this);
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

                    <br/>
                    <br/>

                    <InputLabel htmlFor="responsibleName" className="right-margin">
                        Responsible Name:
                    </InputLabel>

                    <TextField
                        id="responsibleName"
                        onChange={this.handleResponsibleNameChange}
                        value={this.state.responsibleName}>
                    </TextField>

                    <br/>
                    <br/>

                    <InputLabel htmlFor="responsibleEmail" className="right-margin">
                        Responsible Email:
                    </InputLabel>

                    <TextField
                        id="responsibleEmail"
                        onChange={this.handleResponsibleEmailChange}
                        value={this.state.responsibleEmail}>
                    </TextField>

                    <br/>
                    <br/>
                    <InputLabel htmlFor="status" className="right-margin">
                        Status:
                    </InputLabel>

                    <TextField
                        id="status"
                        onChange={this.handleStatusChange}
                        value={this.state.priority}>
                    </TextField>
                    <br/>
                    <br/>

                    <DatePicker
                        id="due-date"
                        selected={this.state.dueDate}
                        placeholderText="Due date"
                        onChange={this.handleDateChange}>
                    </DatePicker>
                    <br/>
                    <Fab type = "submit" variant = "round" size="small" className="fab">
                        <CheckIcon />
                    </Fab>                      
                </form>
                <br/>
                <br/>
            </div>
        );
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleResponsibleNameChange(e) {
        this.setState({
            responsibleName: e.target.value
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

        if (!this.state.description.length || !this.state.status.length || !this.state.dueDate || !this.state.responsibleEmail.length || !this.state.responsibleName.length)
            return;

        const newItem = {
            description: this.state.description,
            status: this.state.status,
            responsible: 
            {
                name: this.state.responsibleName,
                email: this.state.responsibleEmail
            },
            dueDate: this.state.dueDate,

        };
        var storage = JSON.parse(localStorage.getItem('admin'))
        if (storage.hasOwnProperty("items")) {
            storage.items = storage.items.concat(newItem)
        } else {
            storage.items = [newItem]
        }
        localStorage.setItem('admin', JSON.stringify(storage));
        window.location.href = "/";
    }

}