import React from 'react';
import {Task} from './Task'

export default class TaskList extends React.Component {

    render() {
        const todoList = this.props.todoList.map((task, i) => {
            return (
                <div>
                    <Task key={i} description={task.description} responsible={task.responsible} dueDate={task.dueDate} status={task.status}/>
                    <br />
                </div>               
            );
        });

        return (
            <div>
                {todoList}
            </div>
                           
        );


    }

}