import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Draggable from 'react-draggable';
import AddText from '../Helper/AddText';
import FinalIdeas from './FinalIdeas';
import CanvasIdea from './CanvasIdea';

const draggableStyle = {
    "&:hover": {
        cursor: "move",
    },
}

export default function Clustering(props) {

    const [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0});

    const finishMove = (id, elemType) => {
        props.moveElems(id, deltaPosition, elemType);
    }

    const startMove = (e, ui) => {
        setDeltaPosition({x: ui.x, y: ui.y})
    }

    const handleDrag = (e, ui) => {
        const {x, y} = deltaPosition;
        setDeltaPosition({
            x: x + ui.deltaX,
            y: y + ui.deltaY,
        });
      };

    const renderIdeas = () => {
        const ideas = [];

        for (let dls in props.ideas) {
            for (let idea of props.ideas[dls]) {
                let dotted = props.activeCanvas.ideas[idea.id].dots ? true : false;
                let pos = props.activeCanvas.ideas[idea.id].pos ? props.activeCanvas.ideas[idea.id].pos : {x: 0, y: 0}
                ideas.push(
                    <CanvasIdea dotted={dotted} name={idea.name} pos={pos} id={idea.id} key={idea.id} handleDrag={handleDrag}
                        startMove={startMove} finishMove={finishMove} addDot={() => props.addDot(idea.id)}
                        removeDot={() => props.removeDot(idea.id)}
                    />
                )
            }
        }

        return ideas;
    }

    const renderTexts = () => {
        const textCss = [];

        for (let group in props.activeCanvas.groups) {
            const thisGroup = props.activeCanvas.groups[group];
            textCss.push(
                <Draggable bounds="parent" grid={[20, 20]} position={thisGroup.pos}  key={thisGroup.id}
                            onStop={() => finishMove(thisGroup.id, "group")} onDrag={handleDrag}
                            onStart={startMove}
                >
                    <Paper sx={{
                        height: "fit-content", m: 2, p: 1, ...draggableStyle,
                        minWidth: "10rem", bgcolor: "white"
                    }} elevation={4}>
                        <Typography align="center">{thisGroup.name}</Typography>
                    </Paper>
                </Draggable>
            )
        }

        return textCss;
    }

    return(
        <Box sx={{position: "relative"}}>
            <FinalIdeas  top="1rem" right="2rem"/>
            <Typography variant="h2">Clustering</Typography>
            <Box sx={{position: "absolute", top: 0, right: "4rem"}}>
                <AddText placeholder="New Title" onAdd={props.addGroup} />
            </Box>
            <Box sx={{display: "flex", position: "relative", width: "100rem", height: "100rem",
                background: "linear-gradient(90deg, #eee 1%, transparent 1%) 1px 0, linear-gradient(0deg, #eee 1%, transparent 1%) 1px 0, #fff",
                backgroundSize: "60px 60px"
            }}>
                {renderIdeas()}
                {renderTexts()}
            </Box>
        </Box>
    )
}