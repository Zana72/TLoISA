import React from 'react';
import { Paper, Grid, Typography, Box } from '@mui/material';
import { green, red, blue } from '@mui/material/colors';

export default function Profile(props) {

    const combineBehaviours = () => {

        let behaviours = [];
        let ctr = 0;

        for (let key in props.behaviourChain) {
            let name = props.behaviourChain[key].name;
            behaviours.push(<Typography sx={{bgcolor: blue[300], p: 0.8, mr: 1, ml: 1}}>{name}</Typography>);
            if (ctr !== Object.keys(props.behaviourChain).length-1) {
                behaviours.push(<Typography>{' --> '}</Typography>);
            }
            ctr ++;
        }

        return behaviours;
    }

    const combineMotivators = () => {

        let motivators = [];

        for (let key in props.behaviourChain) {
            let bcMotivators = props.behaviourChain[key].motivations;
            for (let motivator of bcMotivators) {
                motivators.push(<Typography sx={{bgcolor: green[300], p: 0.8, mr: 1, ml: 1}}>{motivator}</Typography>);
            }
        }

        return motivators;
    }

    const combineHurdles = () => {

        let hurdles = [];

        for (let key in props.behaviourChain) {
            let bcHurdles = props.behaviourChain[key].hurdles;
            for (let hurdle of bcHurdles) {
                hurdles.push(<Typography sx={{bgcolor: red[300], p: 0.8, mr: 1, ml: 1}}>{hurdle}</Typography>);
            }
        }

        return hurdles;
    }

    return(
        <Box>
            <Typography variant="h2">Target Activity Profile</Typography>
            <Paper sx={{p: 2}}>
                <Grid container>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Activity</Typography></Grid>
                    <Grid item xs={10}><Typography>{props.activity}</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Targetgroup</Typography></Grid>
                    <Grid item xs={10}><Typography>{props.targetGroup}</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Goal</Typography></Grid>
                    <Grid item xs={10}><Typography>{props.goal}</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Metric</Typography></Grid>
                    <Grid item xs={10}><Typography>{props.metric}</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Behaviour Chain</Typography></Grid>
                    <Grid item xs={10}>
                        <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                            {combineBehaviours()}
                        </Box>
                    </Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Motivators</Typography></Grid>
                    <Grid item xs={10}>
                        <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                            {combineMotivators()}
                        </Box>
                    </Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Hurdles</Typography></Grid>
                    <Grid item xs={10}>
                        <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                            {combineHurdles()}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}