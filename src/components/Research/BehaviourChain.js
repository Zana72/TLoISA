import React, {useState} from 'react';
import { TextField, Typography, Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import AddText from '../Helper/AddText';

export default function BehaviourChain(props) {

    const activity = props.activeActivity.activity;

    const renderBahaviourChain = () => {

        let BCparts = [];

        for (let index in props.behaviourChain) {
            let behaviourChain = props.behaviourChain[index];
            BCparts[behaviourChain.priority] = <ChainPart key={index}
                name={behaviourChain.name} motivations={behaviourChain.motivations}
                hurdles={behaviourChain.hurdles} addMotivator={props.addMotivator}
                addHurdle={props.addHurdle} id={behaviourChain.id}
            />
        }

        return BCparts;
    }

    return(
        <Box>
            <Typography variant="h2">Behaviour Chain</Typography>
            <Typography>Teile deine Ziel-Aktivität in unter-Aufgaben auf, um das Design zu vereinfachen.</Typography>
            <Box sx={{display: "flex", m: 2, alignItems: "center"}}>
                <Typography>Active Activity: </Typography>
                <Typography sx={{ml: 2, fontWeight: 500}}>{activity}</Typography>
            </Box>
            <Box sx={{display: "flex", flexWrap: "wrap"}}>
                {renderBahaviourChain()}
                <ChainPartAdder addChainPart={props.addChainPart}/>
            </Box>
        </Box>
    )
}


function ChainPartAdder(props) {

    const [name, setName] = useState("");

    const disabledButton = () => {
        return (name === "")
    }

    
    const addChainPart = () => {
        props.addChainPart(name);
        setName("");
    }

    return(
        <Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                     "borderStyle": "dashed", borderColor: "black", width: "15rem", p: 2, m: 2,
                     "borderWidth": "2px", borderRadius: 2
        }}>
            <TextField value={name} onChange={e => setName(e.target.value)} variant="standard" placeholder="Activity/Behaviour" label="Activity/Behaviour"/>
            <Button onClick={addChainPart}
            disabled={disabledButton()} sx={{width: "100%", mt: 2}} variant="contained" startIcon={<Add/>}>Add</Button>
        </Box>
    )
}

function ChainPart(props) {

    const addHurdle = (name) => {
        props.addHurdle(name, props.id);
    }

    const addMotivator = (name) => {
        props.addMotivator(name, props.id);
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
            <Typography>{props.name}</Typography>
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