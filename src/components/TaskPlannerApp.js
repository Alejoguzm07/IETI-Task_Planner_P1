import React, {Component} from 'react';
import './TodoApp.css';
import TaskList from "./TaskList";
import Drawer from '@material-ui/core/SwipeableDrawer';
import 'react-datepicker/dist/react-datepicker.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import { Typography, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export class TaskPlannerApp extends Component {

    constructor(props) {
        super(props);
        let email = JSON.parse(localStorage.getItem("isLogged")).user
        let user = JSON.parse(localStorage.getItem(email))
        this.state = {user: {name: user.fullname, email: email}};
    }

    getItems = () => {
        var itemsStored = JSON.parse(localStorage.getItem('admin'))
        if (itemsStored.hasOwnProperty("items")) {
            return itemsStored.items
        } else {
            return []
        }
    }

    render() {
        var items = this.getItems()
        return (
            <div className="App">
                <Drawer>
                    <FaceIcon></FaceIcon>
                    <Typography>User: {this.state.user.name}</Typography>
                    <Typography>Email: {this.state.user.email}</Typography>
                    Sign Out
                    <ExitToAppIcon></ExitToAppIcon>
                </Drawer>
                <br/>
                <br/>
                <TaskList taskList={items}/>
                <Fab type = "submit" variant = "round" size="small" className="fab" href="/newTask">
                    <AddIcon />
                </Fab>
            </div>
        );
    }
}