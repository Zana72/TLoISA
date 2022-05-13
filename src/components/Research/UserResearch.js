import React from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Divider, Paper, IconButton, Tooltip } from '@mui/material';
import AddText from '../Helper/AddText';
import { green, red } from '@mui/material/colors';
import { RemoveCircle } from '@mui/icons-material';

export default function UserResearch(props) {

    const activity = props.activeActivity.activity;
    const targetGroup = props.activeActivity.targetGroup;

    const renderBahaviourChain = () => {

        let BCparts = [];

        for (let index in props.behaviourChain) {
            let behaviourChain = props.behaviourChain[index];
            BCparts[index] = <ChainPart key={index}
                name={behaviourChain.name} motivations={behaviourChain.motivations}
                hurdles={behaviourChain.hurdles} 
                addMotivator={name => props.addMotivator(name, index)}
                addHurdle={name => props.addHurdle(name, index)} id={behaviourChain.id}
                removeMotivator={motivIndex => props.removeMotivator(motivIndex, index)}
                removeHurdle={hurdleIndex => props.removeHurdle(hurdleIndex, index)}
            />
        }

        return BCparts;
    }

    return(
        <Box>
            <Typography variant="h2">Behaviour Chain</Typography>
            <Typography>Add motivators and hurdles to each sub-activity based on your user-data</Typography>
            <Box sx={{display: "flex", m: 2, alignItems: "center"}}>
                <Typography>Target Activity: </Typography>
                <Typography sx={{ml: 1, fontWeight: 500}}>{activity} / {targetGroup}</Typography>
            </Box>
            <Box sx={{display: "flex", flexWrap: "wrap"}}>
                {renderBahaviourChain()}
            </Box>
        </Box>
    )
}

function ChainPart(props) {

    const addHurdle = (name) => {
        props.addHurdle(name);
    }

    const addMotivator = (name) => {
        props.addMotivator(name);
    }

    const renderMotivators = () => {
        let motivators = [];

        if (!props.motivations) return;

        for (let index in props.motivations) {
            let motivator = props.motivations[index];
            motivators.push(
                <Box sx={{display: "flex", alignItems: "center"}} key={index}>
                    <Tooltip title="Remove">
                        <IconButton color="error" onClick={() => props.removeMotivator(index)}>
                            <RemoveCircle/>
                        </IconButton>
                    </Tooltip>
                    <Typography>{motivator}</Typography>
                </Box>
            )
        }

        return motivators;
    }

    const renderHurdles = () => {
        let hurdles = [];

        if (!props.hurdles) return;

        for (let index in props.hurdles) {
            let hurdle = props.hurdles[index];
            hurdles.push(
                <Box sx={{display: "flex", alignItems: "center"}} key={index}>
                    <Tooltip title="Remove">
                        <IconButton color="error" onClick={() => props.removeHurdle(index)}>
                            <RemoveCircle/>
                        </IconButton>
                    </Tooltip>
                    <Typography>{hurdle}</Typography>
                </Box>
            )
        }

        return hurdles;
    }

    return (
        <Card sx={{
            display: "flex", alignItems: "center", flexDirection: "column", height: "28rem",
                    width: "16rem", p: 1, m: 2
        }} elevation={6}>
            <CardHeader sx={{mb: 1, m: 0}} title={props.name} titleTypographyProps={{variant:"h3", align: "center"}}/>
            <Divider/>
            <CardContent sx={{overflowY: "auto", p: 0, scrollbarWidth: "thin"}}>
                <Paper sx={{bgcolor: green[100], p: 2, mb: 1}}>
                    <Box sx={{m: 1, ml: 0}}>
                        <Typography>Motivators:</Typography>
                    </Box>
                    {
                        renderMotivators()
                    }
                    <AddText placeholder="New Motivation" onAdd={addMotivator}/>
                </Paper>
                <Paper sx={{bgcolor: red[100], p: 2}}>
                    <Box sx={{m: 1, ml: 0}}>
                        <Typography>Hurdles:</Typography>
                    </Box>
                    {
                        renderHurdles()
                    }
                    <AddText placeholder="New Hurdle" onAdd={addHurdle}/>
                </Paper>
            </CardContent>
        </Card>
    )

}