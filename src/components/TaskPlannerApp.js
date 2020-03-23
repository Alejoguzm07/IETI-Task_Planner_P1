import React, { Component } from 'react';
import './TodoApp.css';
import TaskList from "./TaskList";
import Drawer from '@material-ui/core/Drawer';
import 'react-datepicker/dist/react-datepicker.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Typography, Fab } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import FaceIcon from '@material-ui/icons/Face';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import FilterListIcon from '@material-ui/icons/FilterList';
import Modal from '@material-ui/core/Modal';
import { Filter } from './Filter';
import axios from 'axios';

export class TaskPlannerApp extends Component {

    constructor(props) {
        super(props);
        let email = JSON.parse(localStorage.getItem("isLogged")).user.email
        axios.get('http://localhost:8080/api/tasks', {
            "headers": { "authorization": "Bearer " + localStorage.getItem("token") }
        })
            .then(response => {
                let tasks = [];
                response.data.forEach(function (task) {
                    tasks.push({
                        description: task.description,
                        responsible: {
                            name: task.user.fullname,
                            email: task.user.email
                        },
                        dueDate: task.dueDate,
                        status: task.status
                    })

                });
                this.setState({ tasksList: tasks });
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('http://localhost:8080/api/users/email/' + email, {
            "headers": { "authorization": "Bearer " + localStorage.getItem("token") }
        })
            .then(response => {
                let logged = JSON.parse(localStorage.getItem("isLogged"))
                logged.user = { name: response.data.fullname, email: response.data.email , id: response.data.id }
                localStorage.setItem("isLogged",JSON.stringify(logged))
                this.setState({ user: { name: response.data.fullname, email: response.data.email , id: response.data.id } })
            })
            .catch(error => {
                console.log(error);
            });
        this.state = { tasksList: [], user: { name: "", email: email}, drawer: false, modal: false };
    }

    openToggle = () => event => {
        this.setState({ drawer: true })
    }

    closeToggle = () => event => {
        this.setState({ drawer: false })
    }

    openModal = () => event => {
        this.setState({ modal: true })
    }

    closeModal = () => event => {
        this.setState({ modal: false })
    }

    render() {
        var items = this.state.tasksList
        return (
            <div className="App">
                <Modal open={this.state.modal} onClose={this.closeModal()}>
                    <Filter></Filter>
                </Modal>
                <Drawer open={this.state.drawer} onClose={this.closeToggle()}>
                    <Typography align="center"> User Profile </Typography>
                    <Fab type="submit" size="small" href="/userProfile">
                        <FaceIcon fontSize="small" />
                    </Fab>
                    <Divider />
                    <Typography>User: {this.state.user.name}</Typography>
                    <Typography>Email: {this.state.user.email}</Typography>
                    <Fab type="submit" size="small">
                        <ExitToAppIcon fontSize="small" />
                    </Fab>
                </Drawer>
                <IconButton onClick={this.openToggle()} className="menuFab" type="submit">
                    <MenuIcon />
                </IconButton>
                <br />
                <br />
                <TaskList taskList={items} filter={JSON.parse(localStorage.getItem("filter"))} />
                <Fab type="submit" variant="round" size="small" className="fab" href="/newTask">
                    <AddIcon />
                </Fab>
                <Fab type="submit" variant="round" size="small" className="fab" onClick={this.openModal()}>
                    <FilterListIcon />
                </Fab>
            </div>
        );
    }
}