import React, {Component} from 'react';
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

export class TaskPlannerApp extends Component {

    constructor(props) {
        super(props);
        let email = JSON.parse(localStorage.getItem("isLogged")).user
        let user = JSON.parse(localStorage.getItem(email))
        this.state = {user: {name: user.fullname, email: email}, drawer:false};
    }

    getItems = () => {
        var itemsStored = JSON.parse(localStorage.getItem('admin'))
        if (itemsStored.hasOwnProperty("items")) {
            return itemsStored.items
        } else {
            return []
        }
    }

    openToggle = () => event => {
        this.setState({drawer:true})
    }

    closeToggle = () => event => {
        this.setState({drawer:false})
    }

    render() {
        var items = this.getItems()
        return (
            <div className="App">
                <Drawer open={this.state.drawer} onClose={this.closeToggle()}>
                    <Typography align="center"> User Profile </Typography>
                    <Fab type = "submit"  size="small" href="/userProfile">
                        <FaceIcon fontSize="small"/>
                    </Fab>
                    <Divider />
                    <Typography>User: {this.state.user.name}</Typography>
                    <Typography>Email: {this.state.user.email}</Typography>
                    <Fab type = "submit" size="small">
                        <ExitToAppIcon fontSize="small"/>
                    </Fab>
                </Drawer>
                <IconButton onClick={this.openToggle()} className="menuFab" type="submit">
                    <MenuIcon />
                </IconButton>
                <br/>
                <br/>                
                <TaskList taskList={items}/>
                <Fab type = "submit" variant = "round" size="small" className="fab" href="/newTask">
                    <AddIcon />
                </Fab>
                <Fab type = "submit" variant = "round" size="small" className="fab">
                    <FilterListIcon />
                </Fab>
            </div>
        );
    }
}