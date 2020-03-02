import React, {Component} from 'react';
import './TodoApp.css';
import TaskList from "./TaskList";
import Drawer from '@material-ui/core/SwipeableDrawer';
import 'react-datepicker/dist/react-datepicker.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import { Typography } from '@material-ui/core';
import { NewTask } from './NewTask';

export class TaskPlannerApp extends Component {

    constructor(props) {
        super(props);
        this.state = {user: {name: "Test User", email: "test.user@mail.com"}};
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
                <NewTask></NewTask>
                <br/>
                <br/>
                <TaskList taskList={items}/>
            </div>
        );
    }
}