import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddText from '../Helper/AddText';
import FinalIdeas from './FinalIdeas';
import CanvasIdea from './CanvasIdea';
import CanvasGroup from './CanvasGroup';

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
                <CanvasGroup name={thisGroup.name} pos={thisGroup.pos} id={thisGroup.id} 
                    key={thisGroup.id} handleDrag={handleDrag} startMove={startMove} finishMove={finishMove} 
                    delete={() => {props.removeGroup(thisGroup.id)}}
                />
            )
        }

        return textCss;
    }

    return(
        <Box sx={{position: "relative"}}>
            {/* <FinalIdeas  top="1rem" right="2rem"/> */}
            <Typography variant="h2">Clustering</Typography>
            <Box sx={{position: "absolute", top: 0, right: "4rem"}}>
                <AddText placeholder="New Title" onAdd={props.addGroup} />
            </Box>
            <Box sx={{display: "flex", position: "relative", width: "100rem", height: "100rem",
                background: "linear-gradient(90deg, #eee 1%, transparent 1%) 1px 0, linear-gradient(0deg, #eee 1%, transparent 1%) 1px 0, #fff",
                backgroundSize: "60px 60px", overflow: "auto", flexWrap: "wrap"
            }}>
                {renderIdeas()}
                {renderTexts()}
            </Box>
        </Box>
    )
}