import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

export class Todo extends React.Component {

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.text}</TableCell>
                <TableCell>{this.props.priority}</TableCell>
                <TableCell>{this.props.dueDate.format('DD-MM-YYYY')}</TableCell>
            </TableRow>
        );
    }

}