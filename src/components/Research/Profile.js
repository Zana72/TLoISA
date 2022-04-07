import React from 'react';
import { Paper, Grid, Typography, Box, Tooltip } from '@mui/material';
import { green, red, blue } from '@mui/material/colors';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export default function Profile(props) {

    const combineBehaviours = () => {

        let behaviours = [];
        let ctr = 0;

        for (let key in props.behaviourChain) {
            let name = props.behaviourChain[key].name;
            behaviours.push(
                <Box key={key} sx={{display: "flex", alignItems: "center"}}>
                    {
                        (ctr !== 0) &&
                        <DoubleArrowIcon key={key + "_arrow"} sx={{mr: 1, mb: 1}}/>
                    }
                    <Box sx={{display: "flex", bgcolor: blue[300], p: 0.8, mr: 1, mb: 1, alignItems: "center"}}>
                        <Typography>{name}</Typography>
                        {
                            !props.behaviourChain[key].fitAnswers.includes(false) &&
                            <Box sx={{m: 1, mt: 0}}>
                                <Tooltip title="Fits Gamification">
                                    <SportsEsportsIcon />
                                </Tooltip>
                            </Box>
                        }
                    </Box>
                </Box>
            );
            ctr ++;
        }

        return behaviours;
    }

    const combineMotivators = () => {

        let motivators = [];
        let uniqueList = [];

        for (let key in props.behaviourChain) {
            let bcMotivators = props.behaviourChain[key].motivations;
            for (let motivator of bcMotivators) {
                if (!uniqueList.includes(motivator)) {
                    motivators.push(<Typography key={motivator} sx={{bgcolor: green[300], p: 0.8, mr: 1, mb: 1}}>{motivator}</Typography>);
                    uniqueList.push(motivator);
                }
            }
        }

        return motivators;
    }

    const combineHurdles = () => {

        let hurdles = [];
        let uniqueList = [];

        for (let key in props.behaviourChain) {
            let bcHurdles = props.behaviourChain[key].hurdles;
            for (let hurdle of bcHurdles) {
                if (!uniqueList.includes(hurdle)) {
                    hurdles.push(<Typography key={hurdle} sx={{bgcolor: red[300], p: 0.8, mr: 1, mb: 1}}>{hurdle}</Typography>);
                    uniqueList.push(hurdle);
                }
            }
        }

        return hurdles;
    }

    return(
        <Box>
            <Typography variant="h2">Target Activity Profile</Typography>
            <Paper sx={{p: 2}}>
                <Grid container>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Goal</Typography></Grid>
                    <Grid item xs={10}><Typography>{props.goal}</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Metric</Typography></Grid>
                    <Grid item xs={10}><Typography>{props.metric}</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Activity</Typography></Grid>
                    <Grid item xs={10}><Typography>{props.activity}</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Targetgroup</Typography></Grid>
                    <Grid item xs={10}><Typography>{props.targetGroup}</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Behaviour Chain</Typography></Grid>
                    <Grid item xs={10}>
                        <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center", mb: 2}}>
                            {combineBehaviours()}
                        </Box>
                    </Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Motivators</Typography></Grid>
                    <Grid item xs={10}>
                        <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center", mb: 2}}>
                            {combineMotivators()}
                        </Box>
                    </Grid>
                    <Grid item xs={2}><Typography sx={{fontWeight: 500, mb: 2}}>Hurdles</Typography></Grid>
                    <Grid item xs={10}>
                        <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center", mb: 2}}>
                            {combineHurdles()}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}