import React from 'react';
import {Box, Paper, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';

const entryStyle = {
    p: 1, 
    m: 1, ml: 0,
    backgroundColor: grey[200]
}

const entryStyleClickable = {
    p: 1, 
    borderRadius: 2,
    "&:hover": {
        cursor: "pointer",
        backgroundColor: 'rgb(7, 177, 77, 0.42)'
    },
}

export default function NavBar(props) {

    const navigate = useNavigate();

    const handleNavigation = (link) => {
        navigate(link);
    }

    return(
        <Paper sx={{m: 3, p: 2, minWidth: "15rem", height: "fit-content"}}>
            <Typography sx={entryStyle}>Strategy</Typography>
            <Box sx={{ml:2, mb: 2}}>
                <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/strategy/goal")}>Goals & Metrics</Typography>
                <Typography sx={entryStyle}>Activities & Target Group</Typography>
                <Box sx={{ml: 2, mb: 2}}>
                    <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/strategy/activities/collect")}>Collect</Typography>
                    <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/strategy/activities/prioritize")}>Prioritize</Typography>
                </Box>
            </Box>
            <Typography sx={entryStyle}>Research</Typography>
            <Box sx={{ml:2, mb: 2}}>
                <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/research/behaviourchain")}>Behaviour Chain</Typography>
                <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/research/users")}>User Research</Typography>
                <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/research/doesfit")}>Gamification Fit</Typography>
                <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/research/profile")}>Profile</Typography>
            </Box>
            <Typography sx={entryStyle}>Synthesis</Typography>
            <Box sx={{ml:2, mb: 2}}>
                <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/synthesis/skillatom")}>Create Skill Atom</Typography>
                <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/synthesis/identify")}>Identify Problems</Typography>
            </Box>
            <Typography sx={entryStyle}>Ideation</Typography>
            <Box sx={{ml:2, mb: 2}}>
                <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/ideation/focusquestions")}>Focus Questions</Typography>
                <Typography sx={entryStyleClickable} onClick={() => handleNavigation("/ideation/clustering")}>Cluster & Finalize Ideas</Typography>
            </Box>
        </Paper>
    )
}