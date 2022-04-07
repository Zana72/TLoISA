import React from 'react';
import { Typography, Box } from '@mui/material';
import AddText from '../Helper/AddText';

export default function UserResearch(props) {

    const activity = props.activeActivity.activity;
    const targetGroup = props.activeActivity.targetGroup;

    const renderBahaviourChain = () => {

        let BCparts = [];

        for (let index in props.behaviourChain) {
            let behaviourChain = props.behaviourChain[index];
            BCparts[behaviourChain.priority] = <ChainPart key={index}
                name={behaviourChain.name} motivations={behaviourChain.motivations}
                hurdles={behaviourChain.hurdles} 
                addMotivator={name => props.addMotivator(name, index)}
                addHurdle={name => props.addHurdle(name, index)} id={behaviourChain.id}
            />
        }

        return BCparts;
    }

    return(
        <Box>
            <Typography variant="h2">Behaviour Chain</Typography>
            <Typography>Teile deine Ziel-Aktivität in unter-Aufgaben auf, um das Design zu vereinfachen.</Typography>
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

        for (let motivator of props.motivations) {
            motivators.push(
                <Typography key={motivator}>{motivator}</Typography>
            )
        }

        return motivators;
    }

    const renderHurdles = () => {
        let hurdles = [];

        if (!props.hurdles) return;

        for (let hurdle of props.hurdles) {
            hurdles.push(
                <Typography key={hurdle}>{hurdle}</Typography>
            )
        }

        return hurdles;
    }

    return (
        <Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                     "borderStyle": "dashed", borderColor: "black", width: "15rem", p: 2, m: 2,
                     "borderWidth": "2px", borderRadius: 2
        }}>
            <Box sx={{mb: 1}}>
                <Typography sx={{fontWeight: 500}}>{props.name}</Typography>
            </Box>
            <Box>
                <Typography>Motivators:</Typography>
                {
                    renderMotivators()
                }
                <AddText placeholder="New Motivation" onAdd={addMotivator}/>
            </Box>
            <Box>
                <Typography>Hurdles:</Typography>
                {
                    renderHurdles()
                }
                <AddText placeholder="New Hurdle" onAdd={addHurdle}/>
            </Box>
        </Box>
    )

}