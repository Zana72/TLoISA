import React, {useState} from 'react';
import { TextField, Typography, Box, Button, IconButton, Card, Paper, CardHeader } from '@mui/material';
import { Add, ArrowBackIosNew, ArrowForwardIos, Delete } from '@mui/icons-material';

export default function BehaviourChain(props) {

    const activity = props.activeActivity.activity;
    const targetGroup = props.activeActivity.targetGroup;

    const renderBahaviourChain = () => {

        let BCparts = [];

        for (let index in props.behaviourChain) {
            let behaviourChain = props.behaviourChain[index];
            BCparts[index] = 
            <Box key={index} sx={{display: "flex", alignItems: "center"}}>
                <ChainPart key={behaviourChain.id} handleSwap={direction => props.handleSwap(index, direction)}
                    name={behaviourChain.name} id={behaviourChain.id} removeChainPart={() => props.removeChainPart(index)}
                    isFirst={parseInt(index)===0} isLast={parseInt(index)===props.behaviourChain.length - 1}
                    index={index}
                />
            </Box>
        }

        return BCparts;
    }

    return(
        <Box>
            <Typography variant="h2">Behaviour Chain</Typography>
            <Typography>Split the target activity into sub-activities to simplify research and design considerations</Typography>
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
        <Paper sx={{
            display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                     width: "15rem", p: 2, m: 2, ml: 5
        }}>
            <TextField value={name} onChange={e => setName(e.target.value)} variant="standard" placeholder="Activity/Behaviour" label="Activity/Behaviour"/>
            <Button onClick={addChainPart}
            disabled={disabledButton()} sx={{width: "100%", mt: 2}} variant="contained" startIcon={<Add/>}>Add</Button>
        </Paper>
    )
}

function ChainPart(props) {

    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            {
                !props.isFirst &&
                <IconButton
                    onClick={() => {props.handleSwap("left")}}
                >
                    <ArrowBackIosNew/>
                </IconButton>
            } 
            <Card sx={{
                        width: "15rem", p: 2, m: 2
            }} elevation={4}>
                <CardHeader 
                title={
                    <Typography align="center" sx={{fontWeight: 500}}>{props.index}: {props.name}</Typography>
                }
                action={
                    <IconButton onClick={props.removeChainPart}>
                        <Delete/>
                    </IconButton>
                }/>
            </Card>
            
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