import React, {Component} from 'react';
import './TodoApp.css';
import TaskList from "./TaskList";
import DatePicker from 'react-datepicker';
import Drawer from '@material-ui/core/SwipeableDrawer';
import 'react-datepicker/dist/react-datepicker.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import moment from "moment";
import { InputLabel, TextField, Button, Typography } from '@material-ui/core';

export class TodoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [], description: '', status: "in progress", dueDate: moment(), responsibleName: '' , responsibleEmail: '' ,
        user: {name: "Test User", email: "test.user@mail.com"}};
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
                <Drawer>
                    <FaceIcon></FaceIcon>
                    <Typography>User: {this.state.user.name}</Typography>
                    <Typography>Email: {this.state.user.email}</Typography>
                    Sign Out
                    <ExitToAppIcon></ExitToAppIcon>
                </Drawer>
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
                    <Button type = "submit" variant = "outlined" style={{fill:"#A23109"}}>
                        Add #{this.state.items.length + 1}
                    </Button>
                </form>
                <br/>
                <br/>
                <TaskList todoList={this.state.items}/>
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
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            description: '',
            status: '',
            dueDate: '',
            Responsible: {
                name: '',
                email: ''
            }
        }));
    }

}