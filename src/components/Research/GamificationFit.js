import { ArrowForwardSharp } from '@mui/icons-material';
import { Typography, Box, List, ListItem, ListItemText, ListItemIcon, Checkbox, Grid, IconButton, Divider, Paper } from '@mui/material';
import { green, grey, yellow } from '@mui/material/colors';
import React, {useState} from 'react';

export default function GamificationFit(props) {

    const [activePrio, setActivePrio] = useState(0);    
    
    const handleToggle = (value) => () => {
        let activeBehaviourPart = props.behaviourChain[activePrio];
        props.handleBcFit(activePrio, value, !activeBehaviourPart.fitAnswers[value]);
    };

    const checkIfFit = (fitAnswers) => {

        let orResult = false;
        let andResult = true;

        for (let answer of fitAnswers) {
            andResult = andResult && answer;
            orResult = orResult || answer;
        }
        
        if (andResult) return 2;
        else if (orResult) return 1;
        else return 0;
    }

    const moveToNextBcPart = () => {
        if (activePrio < Object.keys(props.behaviourChain).length - 1) {
            setActivePrio(parseInt(activePrio)+1);
        } else {
            setActivePrio(0);
        }
    }

    const isChecked = (number) => {
        console.log(activePrio);
        let activeBehaviourPart = props.behaviourChain[activePrio];
        if (activeBehaviourPart.fitAnswers) {
            return (
                activeBehaviourPart.fitAnswers[number]
            )
        } else return false;
    } 

    const renderBcPart = () => {

        let activeBehaviourPart = props.behaviourChain[activePrio];
        if (activeBehaviourPart && activeBehaviourPart.name !== undefined) {
            return <BcPart name={activeBehaviourPart.name} motivations={activeBehaviourPart.motivations}
                    hurdles={activeBehaviourPart.hurdles} key={activePrio}
            />
        } else {
            return <Typography key={activePrio}>There is not active behaviour part</Typography>
        }
    }

    const renderActivities = () => {
        let activities = [];
        let elevation;

        for (let index in props.behaviourChain) {
            let bcPart = props.behaviourChain[index];
            if (index === activePrio) {
                elevation = 6
            } else {
                elevation = 1
            }
            if (checkIfFit(bcPart.fitAnswers) === 0) {
                activities.push(
                    <Paper sx={{bgcolor: grey[200], p: 0.8, ml: 1,
                        "&:hover": { cursor: "pointer"}}} elevation={elevation} key={index}
                    >
                        <Typography onClick={() => {setActivePrio(index)}}
                        >{bcPart.name}</Typography>

                    </Paper>
                )
            } else if (checkIfFit(bcPart.fitAnswers) === 1) {
                activities.push(
                    <Paper sx={{bgcolor: yellow[200], p: 0.8, ml: 1,
                            "&:hover": { cursor: "pointer"}}} elevation={elevation} key={index} 
                    >
                        <Typography onClick={() => {setActivePrio(index)}}
                        >{bcPart.name}</Typography>

                    </Paper>
                )
            } else {
                activities.push(
                    <Paper sx={{bgcolor: green[200], p: 0.8, ml: 1,
                        "&:hover": { cursor: "pointer"}}} elevation={elevation} key={index} 
                    >
                        <Typography onClick={() => {setActivePrio(index)}}
                        >{bcPart.name}</Typography>

                    </Paper>
                )
            }
        }
        
        return activities;
    }

    if (Object.keys(props.behaviourChain).length > 0) {
        return(
            <Box>
                <Typography variant="h2">Gamification Fit</Typography>
                <Typography sx={{mb: 2}}>
                    Before you develop an ingenious Gameful Design, you should determined if this actually helps to achieve your goals.
                    All four of the following questions should be answered positively in order to evaluate a sub-activity as suitable.
                </Typography>
                <Grid container>
                    <Grid item xs={9} sx={{}}>
                        <Box sx={{display: "flex", mb: 2, ml: 2}}>
                            <Typography sx={{mr: 1}}>Target Activity:</Typography>
                            <Typography sx={{fontWeight: 500}}>{props.targetActivity} / {props.targetGroup}</Typography>
                        </Box>
                        <Box sx={{display: "flex", m: 1, flexWrap: "wrap"}}>
                            {renderActivities()}
                        </Box>
                        <Box sx={{display: "flex", m: 2}}>
                            {renderBcPart()}
                            <IconButton onClick={moveToNextBcPart}><ArrowForwardSharp/></IconButton>
                        </Box>
                        <List>
                            <ListItem>
                                <ListItemIcon onClick={handleToggle(0)}>
                                    <Checkbox edge="start" checked={isChecked(0)}/>
                                </ListItemIcon>
                                <ListItemText primary="Does the activity connect to an actual user need?"/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon onClick={handleToggle(1)}>
                                    <Checkbox edge="start" checked={isChecked(1)}/>
                                </ListItemIcon>
                                <ListItemText primary="Is lacking motivation a central issue or opportunity (and not, e.g., poor usability)?"/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon onClick={handleToggle(2)}>
                                    <Checkbox edge="start" checked={isChecked(2)}/>
                                </ListItemIcon>
                                <ListItemText primary="Does the target activity involve an inherent challenge with a learnable skill?"/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon onClick={handleToggle(3)}>
                                    <Checkbox edge="start" checked={isChecked(3)}/>
                                </ListItemIcon>
                                <ListItemText primary="Is affording experiences of competence the most effective and efficient way of improving motivation 
                                                        (and not, e.g., defusing fears)?"/>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Box>
        )
    } else {
        return <Typography>You need to set up a behaviour chain before you can do this step.</Typography>
    }
}

function BcPart(props) {

    const renderMotivations = () => {
        let motivations = [];

        for (let motivation of props.motivations) {
            motivations.push(
                <Typography key={motivation}>- {motivation}</Typography>
            )
        }

        return motivations;
    }

    const renderHurdles = () => {
        let hurdles = [];

        for (let hurdle of props.hurdles) {
            hurdles.push(
                <Typography key={hurdle}>- {hurdle}</Typography>
            )
        }

        return hurdles;
    }

    return(
        <Paper sx={{
            display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                     width: "30rem", p: 2, m: 2
        }} elevation={4}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>Activity:</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <Typography>{props.name}</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <Typography>Motivators:</Typography>
                </Grid>
                <Grid item xs={6}>
                    {
                        renderMotivations()
                    }
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <Typography>Hurdles:</Typography>
                </Grid>
                <Grid item xs={6}>
                    {
                        renderHurdles()
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}