import React, {useState} from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, ListItemIcon, IconButton } from '@mui/material';
import AddText from '../Helper/AddText';
import { Delete } from '@mui/icons-material';
import WarningModal from './WarningModal';

export default function ActivitiesCollect(props) {

    const [open, setOpen] = useState(false);
    const handePairCreationRequest = () => {
        if (props.activityTargetPairs) {
            setOpen(true);
        } else {
            props.generateActivityPairs();
        }
    }
    const handleClose = () => setOpen(false);

    const renderActivities = () => {
        let activities = [];
        for (let index in props.activities) {
            let activity = props.activities[index];
            activities.push(
                <ListItem key={activity}>
                    <ListItemText primary={activity}/>
                    <ListItemIcon>
                        <IconButton onClick={() => props.removeActivity(index)} color="error">
                            <Delete />
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            )
        }

        return activities;
    }

    const renderTargetGroups = () => {
        let targetGroups = [];
        for (let index in props.targetGroups) {
            let targetGroup = props.targetGroups[index];
            targetGroups.push(
                <ListItem key={targetGroup}>
                    <ListItemText primary={targetGroup}/>
                    <ListItemIcon>
                        <IconButton onClick={() => props.removeTargetGroup(index)} color="error">
                            <Delete />
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            )
        }

        return targetGroups;
    }

    return(
        <Box sx={{display:"flex", justifyContent: "center", flexDirection: "column"}}>
            <Box sx={{display: "flex", justifyContent:"space-evenly", mt: 6}}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Typography variant="h3">Target Groups</Typography>
                    <List>
                        {renderTargetGroups()}
                        <ListItem>
                            <AddText onAdd={props.addTargetGroup} placeholder="Add target group"/>
                        </ListItem>
                    </List>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Typography variant="h3">Activities</Typography>
                    <List>
                        {renderActivities()}
                        <ListItem>
                            <AddText onAdd={props.addActivity} placeholder="Add activity"/>
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Button variant="contained" onClick={handePairCreationRequest}>Create Pairs</Button>
            <WarningModal
                open={open} handleClose={handleClose} execute={props.generateActivityPairs}
            />
        </Box>
    )
}