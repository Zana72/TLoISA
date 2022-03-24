import { ArrowForwardSharp } from '@mui/icons-material';
import { Typography, Box, List, ListItem, ListItemText, ListItemIcon, Checkbox, Grid, IconButton } from '@mui/material';
import { green, grey, yellow } from '@mui/material/colors';
import React, {useState} from 'react';

export default function GamificationFit(props) {

    const [activePrio, setActivePrio] = useState(0);    
    
    const handleToggle = (value) => () => {
        for (let bp in props.behaviourChain) {
            if (props.behaviourChain[bp].priority === activePrio) {
                let activeBehaviourPart = props.behaviourChain[bp];
                props.handleBcFit(activeBehaviourPart.id, value, !activeBehaviourPart.fitAnswers[value]);
                return;
            }
        }
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
            setActivePrio(activePrio+1);
        } else {
            setActivePrio(0);
        }
    }

    const isChecked = (number) => {
        for (let bp in props.behaviourChain) {
            if (props.behaviourChain[bp].priority === activePrio) {
                let activeBehaviourPart = props.behaviourChain[bp];
                if (activeBehaviourPart.fitAnswers) {
                    return (
                        activeBehaviourPart.fitAnswers[number]
                    )
                } else return false;
            }
        }
    } 

    const renderBcPart = () => {

        for (let bp in props.behaviourChain) {
            if (props.behaviourChain[bp].priority === activePrio) {
                let activeBehaviourPart = props.behaviourChain[bp];
                if (activeBehaviourPart && activeBehaviourPart.name !== undefined) {
                    return <BcPart name={activeBehaviourPart.name} motivations={activeBehaviourPart.motivations}
                            hurdles={activeBehaviourPart.hurdles}
                    />
                } else {
                    return <Typography>There is not active behaviour part</Typography>
                }
            }
        }
    }

    const renderActivities = () => {
        let activities = [];
        let borderStyle;

        for (let key in props.behaviourChain) {
            let bcPart = props.behaviourChain[key];
            if (bcPart.priority === activePrio) {
                borderStyle = "solid"
            } else {
                borderStyle = "none"
            }
            if (checkIfFit(bcPart.fitAnswers) === 0) {
                activities.push(
                    <Typography onClick={() => {setActivePrio(bcPart.priority)}} key={key} 
                        sx={{bgcolor: grey[200], p: 0.8, ml: 1, outlineStyle: borderStyle,
                            "&:hover": { cursor: "pointer"}}}
                    >{props.behaviourChain[key].name}</Typography>
                )
            } else if (checkIfFit(bcPart.fitAnswers) === 1) {
                activities.push(
                    <Typography onClick={() => {setActivePrio(bcPart.priority)}} key={key} 
                        sx={{bgcolor: yellow[200], p: 0.8, ml: 1, outlineStyle: borderStyle,
                            "&:hover": { cursor: "pointer"}}}
                    >{bcPart.name}</Typography>
                )
            } else {
                activities.push(
                    <Typography onClick={() => {setActivePrio(bcPart.priority)}} key={key} 
                        sx={{bgcolor: green[200], p: 0.8, ml: 1, outlineStyle: borderStyle,
                            "&:hover": { cursor: "pointer"}}}
                    >{bcPart.name}</Typography>
                )
            }
        }
        
        return activities;
    }

    return(
        <Box>
            <Typography variant="h2">Gamification Fit</Typography>
            <Typography sx={{mb: 2}}>
                Before development of an ingenious Gameful Design, it should be determined if this actually helps to achieve your goals.
                All four of the following questions should be answered positively.
            </Typography>
            <Typography variant="h3">{props.targetActivity}</Typography>
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
        </Box>
    )
}

function BcPart(props) {

    const renderMotivations = () => {
        let motivations = [];

        for (let motivation of props.motivations) {
            motivations.push(
                <Typography key={motivation}>{motivation}</Typography>
            )
        }

        return motivations;
    }

    const renderHurdles = () => {
        let hurdles = [];

        for (let hurdle of props.hurdles) {
            hurdles.push(
                <Typography key={hurdle}>{hurdle}</Typography>
            )
        }

        return hurdles;
    }

    return(
        <Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                     "borderStyle": "dashed", borderColor: "black", width: "15rem", p: 2, m: 2,
                     "borderWidth": "2px", borderRadius: 2
        }}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>Activity:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{props.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Motivators:</Typography>
                </Grid>
                <Grid item xs={6}>
                    {
                        renderHurdles()
                    }
                </Grid>
                <Grid item xs={6}>
                    <Typography>Hurdles:</Typography>
                </Grid>
                <Grid item xs={6}>
                    {
                        renderMotivations()
                    }
                </Grid>
            </Grid>
        </Box>
    )
}