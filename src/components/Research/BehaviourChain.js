import React, {useState} from 'react';
import { TextField, Typography, Box, Button, IconButton } from '@mui/material';
import { Add, ArrowBackIosNew, ArrowForwardIos, DoubleArrow } from '@mui/icons-material';

export default function BehaviourChain(props) {

    const activity = props.activeActivity.activity;
    const targetGroup = props.activeActivity.targetGroup;

    const renderBahaviourChain = () => {

        let BCparts = [];

        for (let index in props.behaviourChain) {
            let behaviourChain = props.behaviourChain[index];
            let priority = behaviourChain.priority;
            if (priority !== 0) {
                BCparts[behaviourChain.priority] = 
                <Box key={priority} sx={{display: "flex", alignItems: "center"}}>
                    <DoubleArrow/>
                    <ChainPart key={index} handleSwap={direction => props.handleSwap(priority, direction)}
                        name={behaviourChain.name} motivations={behaviourChain.motivations}
                        hurdles={behaviourChain.hurdles} addMotivator={props.addMotivator}
                        addHurdle={props.addHurdle} id={behaviourChain.id}
                    />
                </Box>
            } else {
                BCparts[priority] = 
                <Box key={priority} sx={{display: "flex", alignItems: "center"}}>
                    <ChainPart key={index} handleSwap={direction => props.handleSwap(priority, direction)}
                        name={behaviourChain.name} motivations={behaviourChain.motivations}
                        hurdles={behaviourChain.hurdles} addMotivator={props.addMotivator}
                        addHurdle={props.addHurdle} id={behaviourChain.id}
                    />
                </Box>
            }
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

    return (  
        <Box sx={{
            display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row",
                    "borderStyle": "dashed", borderColor: "black", width: "15rem", p: 2, m: 2,
                    "borderWidth": "2px", borderRadius: 2
        }}>             
            {
                !props.isFirst &&
                <IconButton
                    onClick={() => {props.handleSwap("left")}}
                >
                    <ArrowBackIosNew/>
                </IconButton>
            }   
            <Box>
                <Typography sx={{fontWeight: 500}}>{props.name}</Typography>
            </Box>
            {
                !props.isLast &&
                <IconButton
                    onClick={() => {props.handleSwap("right")}}
                >
                    <ArrowForwardIos/>
                </IconButton>
            }

        </Box>
    )

}