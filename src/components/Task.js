import React from 'react';
import { Typography, Card } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import moment from "moment";
import AlarmIcon from '@material-ui/icons/Alarm';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';

export class Task extends React.Component {

    render() {        
        var icon = null;
        var status = null;
        if (this.props.status === "COMPLETED") {
            icon = <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
            status = this.props.status;
        } else if (this.props.status === "READY") {
            icon = <AlarmOnIcon></AlarmOnIcon>
            status = this.props.status;
        } else if (this.props.status === "IN_PROGRESS") {
            icon = <AlarmIcon />
            status = this.props.status;
        } else {
            status = "NO_STATUS";
            icon = <PanoramaFishEyeIcon></PanoramaFishEyeIcon>
        }
        var responsibleName = null;
        var responsibleEmail = null;
        if (this.props.responsible === undefined) {
            responsibleName = "No Assigned"
            responsibleEmail = "No Assigned"
        } else {
            responsibleName = this.props.responsible.name
            responsibleEmail = this.props.responsible.email
        }
        return (
            <Card variant="outlined">
                <Typography variant="h5">{this.props.description}</Typography>
                {icon}
                <Typography>{status}</Typography>                
                <Typography>{moment(this.props.dueDate).format('DD/MM/YYYY')}</Typography>
                <Typography>{responsibleName}</Typography>
                <Typography>{responsibleEmail}</Typography>
            </Card>                
        );
    }

}