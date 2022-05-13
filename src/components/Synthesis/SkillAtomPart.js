import React, {useState} from 'react';
import {Box, Card, CardHeader, CardContent, Typography, Divider, IconButton, Popover} from '@mui/material';
import AddText from '../Helper/AddText';
import { HelpOutline, Remove } from '@mui/icons-material';

function ExplanationHelper(props) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
        <Box>
            <IconButton
                onClick={handleClick}
            >
                <HelpOutline/>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: 'right',
                }}
            >
                <Box sx={{m: 2, maxWidth:"20rem"}}>
                    <Typography>{props.info}</Typography>
                </Box>
            </Popover>
        </Box>

    )
}

export default function SkillAtomPart(props) {

    const [dynamicElevation, setDynamicElevation] = useState(4);

    const renderBulletPoints = () => {

        let elements = [];

        for (let index in props.points) {
            let point = props.points[index];
            elements.push(
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}} key={index}>
                    <Typography key={point}>{point}</Typography>
                    <IconButton size="small" color="error"
                        onClick={() => props.removePoint(index)}
                    >
                        <Remove/>
                    </IconButton>
                </Box>

            )
        }

        return elements;
    }

    const handleActivation = () => {
        props.onClick();
        setDynamicElevation(4);
    }

    if (props.isActive) {
        return(
            <Card sx={{position: "absolute", height: "13rem", width: "15rem", top: props.top, left: props.left, overflow: "auto"}}
                    elevation={8}
            >
                <CardHeader 
                    title={props.title}
                    action={
                        <ExplanationHelper 
                            info={props.info}
                        />}
                    avatar={props.icon}
                    
                />
                <Divider/>
                <CardContent>
                    {renderBulletPoints()}
                    {
                        !props.textOnly && 
                        <AddText placeholder={props.addPlaceholder} onAdd={props.addPoint}/>
                    }
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Card sx={{position: "absolute", height: "13rem", 
                        width: "15rem", top: props.top, left: props.left, 
                        overflow: "auto",     "&:hover": {cursor: "pointer"},
                    }}
                elevation={dynamicElevation} onMouseOver={() => setDynamicElevation(8)} onMouseLeave={() => setDynamicElevation(4)}
                onClick={handleActivation}
            >
                <CardHeader 
                    title={props.title}
                    action={
                        <ExplanationHelper 
                            info={props.info}
                        />}
                    avatar={props.icon}
                    
                />
                <Divider/>
                <CardContent>
                    {renderBulletPoints()}
                </CardContent>
            </Card>
        )
    }
}