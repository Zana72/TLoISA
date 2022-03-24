import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import AddText from '../Helper/AddText';

export default function ActivitiesCollect(props) {

    const renderActivities = () => {
        let activities = [];
        for (let activity of props.activities) {
            activities.push(
                <ListItem key={activity}>
                    <ListItemText primary={activity}/>
                </ListItem>
            )
        }

        return activities;
    }

    const renderTargetGroups = () => {
        let targetGroups = [];
        for (let targetGroup of props.targetGroups) {
            targetGroups.push(
                <ListItem key={targetGroup}>
                    <ListItemText primary={targetGroup}/>
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
            <Button variant="contained" onClick={props.generateActivityPairs}>Create Pairs</Button>
        </Box>
    )
}