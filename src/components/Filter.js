import React, {Component} from 'react';
import { Typography, Fab, TextField } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";

export class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "", dueDate: moment(), responsibleName: '' , responsibleEmail: '', date:false
        }
    }
    handleResponsibleNameChange = () => event => {
        this.setState({responsibleName: event.target.value})
    }

    handleResponsibleEmailChange = () => event => {
        this.setState({responsibleEmail: event.target.value})
    }

    handleStatusChange = () => event => {
        this.setState({status: event.target.value})
    }

    handleDateChange = (date) => {
        this.setState({
            dueDate: date, date:true
        });
    }

    handleClear = () => event => {
        this.setState({status: "", dueDate: moment(), responsibleName: '' , responsibleEmail: '', date:false})
        localStorage.removeItem("filter")
    }

    handleSubmit = () => event => {
        let filter = {}
        if (this.state.status !== "") {
            if (this.state.status === "completed" || this.state.status === "ready" || this.state.status === "in progress") {
                filter.status = this.state.status
            } else {
                filter.status = "No Status";
            }
        }
        if (this.state.responsibleName !== "") {
            filter.responsibleName = this.state.responsibleName
            
        }
        if (this.state.responsibleEmail !== "") {
            filter.responsibleEmail = this.state.responsibleEmail
            
        }
        if (this.state.date !== false) {
            filter.dueDate = this.state.dueDate
            
        }
        localStorage.setItem("filter", JSON.stringify(filter));
    }
x
    render() {
        return (
            <div className={"modal"}>
                <Typography variant="h2">Filter Tasks</Typography>
                <TextField label="responsible email" defaultValue={this.state.responsibleEmail} value={this.state.responsibleEmail} onChange={this.handleResponsibleEmailChange()}/> <br/>
                <TextField label="responsible name" defaultValue={this.state.responsibleName} value={this.state.responsibleName} onChange={this.handleResponsibleNameChange()}/> <br/>
                <TextField label="status" defaultValue={this.state.status} value={this.state.status} onChange={this.handleStatusChange()}/> <br/>
                <DatePicker
                        id="due-date"
                        selected={this.state.dueDate}
                        placeholderText="Due date"
                        onChange={this.handleDateChange}>
                    </DatePicker>
                <br/>
                <Fab type = "submit" size="small" variant="extended" onClick={this.handleSubmit()}>
                    <CheckIcon fontSize="small"/>
                </Fab>
                <Fab type = "submit" size="small" variant="extended" onClick={this.handleClear()}>
                    <ClearIcon fontSize="small"/>
                </Fab>
            </div>
        );
    }
}