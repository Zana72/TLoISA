import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Draggable from 'react-draggable';
import AddText from '../Helper/AddText';
import FinalIdeas from './FinalIdeas';

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
                ideas.push(
                    <Draggable bounds="parent" grid={[20, 20]} position={props.activeCanvas.ideas[idea.id]}
                                onStop={() => finishMove(idea.id, "idea")} onDrag={handleDrag}
                                onStart={startMove}
                    >
                        <Box sx={{
                            height: "fit-content", minWidth: "10rem", 
                            m: 2, bgcolor: "secondary.light", p: 2, ...draggableStyle,
                            borderStyle: "solid", borderRadius: "10px", borderWidth: "2px"
                        }}>
                            <Typography align="center">{idea.name}</Typography>
                        </Box>
                    </Draggable>
                )
            }
        }

        return ideas;
    }

    const renderTexts = () => {
        const textCss = [];

        for (let group in props.activeCanvas.groups) {
            const thisGroup = props.activeCanvas.groups[group];
            console.log(thisGroup.id);
            textCss.push(
                <Draggable bounds="parent" grid={[20, 20]} position={thisGroup.pos}
                            onStop={() => finishMove(thisGroup.id, "group")} onDrag={handleDrag}
                            onStart={startMove}
                >
                    <Box sx={{
                        height: "fit-content", m: 2, p: 1, ...draggableStyle,
                        borderStyle: "solid", minWidth: "10rem",
                        bgcolor: "white"
                    }}>
                        <Typography align="center">{thisGroup.name}</Typography>
                    </Box>
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
            <Box sx={{display: "flex", position: "relative", width: "100rem", height: "100rem"}}>
                {renderIdeas()}
                {renderTexts()}
            </Box>
        </Box>
    )
}