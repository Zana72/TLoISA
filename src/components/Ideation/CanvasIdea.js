import React, {useState} from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import { Add, Circle, Remove } from '@mui/icons-material';
import Draggable from 'react-draggable';

const draggableStyle = {
    "&:hover": {
        cursor: "move",
    },
}

export default function CanvasIdea(props) {

    const [showDotAdder, setShowDotAdder] = useState(false);

    const handleShow = () => {
        setShowDotAdder(true);
    }

    const handleUnshow = () => {
        setShowDotAdder(false);
    }

    return(
        
        <Draggable bounds="parent" grid={[20, 20]} position={props.pos}
                onStop={() => props.finishMove(props.id, "idea")} onDrag={props.handleDrag}
                onStart={props.startMove}
        >
            <Box sx={{
                        height: "fit-content", ...draggableStyle, display: "flex", alignItems: "start"

                    }} 
                    onMouseEnter={handleShow}
                    onMouseLeave={handleUnshow}>
                <Paper sx={{
                        height: "fit-content", minWidth: "10rem", 
                        m: 2, mt: 0, mr: 0, bgcolor: "secondary.light", p: 2, ...draggableStyle,
                        maxWidth: "12rem"
                    }} elevation={4}
                    aria-haspopup="true"
                >
                    {
                        props.dotted &&
                        <Circle color="error" sx={{}}/>
                    }
                    <Typography align="center">{props.name}</Typography>
                </Paper>
                <Button sx={{opacity: showDotAdder ? "100%": "0%"}}>
                    {
                        props.dotted
                        ?<Remove onClick={props.removeDot}/>
                        :<Add onClick={props.addDot}/>
                    }
                    <Circle color="error"/>
                </Button>
            </Box>
        </Draggable>
    )
}