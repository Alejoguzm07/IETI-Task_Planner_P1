import React from 'react';
import {Task} from './Task'
import moment from "moment";

export default class TaskList extends React.Component {

    render() {
        const todoList = this.props.taskList.map((task, i) => {
            let flag = true
            if (this.props.filter !== null) {
                if (this.props.filter.hasOwnProperty("status")) {
                    if (this.props.filter.status !== task.status) {
                        flag = false
                        return
                    }
                }
                if (this.props.filter.hasOwnProperty("responsibleName")) {
                    if (this.props.filter.responsibleName !== task.responsible.name) {
                        flag = false
                        return
                    }
                }
                if (this.props.filter.hasOwnProperty("responsibleEmail")) {
                    if (this.props.filter.responsibleEmail !== task.responsible.email) {
                        flag = false
                        return
                    }
                }
                if (this.props.filter.hasOwnProperty("dueDate")) {
                    if (!moment(this.props.filter.dueDate).isSame(task.dueDate,"year") || !moment(this.props.filter.dueDate).isSame(task.dueDate,"month") ||
                    !moment(this.props.filter.dueDate).isSame(task.dueDate,"day")) {
                        flag = false
                        return
                    }
                }
            } 
            if (flag) {
                return(
                    <div>
                        <Task key={i} description={task.description} responsible={task.responsible} dueDate={task.dueDate} status={task.status}/>
                        <br />
                    </div> 
                )
            }
            
        });
        return (
            <div>
                {todoList}
            </div>
                           
        );


    }

}