import React from 'react';
import {Todo} from './Todo'
import { TableContainer, TableHead, TableCell, TableBody,Table,TableRow} from '@material-ui/core';

export default class TodoList extends React.Component {

    render() {
        const todoList = this.props.todoList.map((todo, i) => {
            return (
                <Todo key={i} text={todo.text} priority={todo.priority} dueDate={todo.dueDate}/>
            );
        });

        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Due Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todoList}
                    </TableBody>
                </Table>                
            </TableContainer>
        );


    }

}