import React from 'react';
import {Box, Paper, Typography} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
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
        backgroundColor: 'primary.light'
    },
}

const entryStyleClickableOpen = {
    p: 1, 
    borderRadius: 2,
    backgroundColor: "secondary.light",
    "&:hover": {
        cursor: "pointer",
        backgroundColor: 'primary.light'
    },
}

export default function NavBar() {

    const navigate = useNavigate();
    let location = useLocation();

    // const [uploadDisabled, setUploadDisabled] = useState(false);

    const handleNavigation = (link) => {
        navigate(link);
    }

    const isActive = (link) => {
        return link === location.pathname; 
    }

    const determineStyle = (link) => {
        if (!isActive(link)) {
            return entryStyleClickable;
        } else {
            return entryStyleClickableOpen;
        }
    }

    // const uploadData = () => {
    //     uploadLocalStorage();
    //     setUploadDisabled(true);
    // }

    return(
        <Paper sx={{m: 3, p: 2, minWidth: "15rem", height: "fit-content"}}>
            <Typography sx={entryStyle}>Strategy</Typography>
            <Box sx={{ml:2, mb: 2}}>
                <Typography sx={determineStyle("/strategy/goal")} onClick={() => handleNavigation("/strategy/goal")}>Goals & Metrics</Typography>
                <Typography sx={entryStyle}>Activities & Target Group</Typography>
                <Box sx={{ml: 2, mb: 2}}>
                    <Typography sx={determineStyle("/strategy/activities/collect")} onClick={() => handleNavigation("/strategy/activities/collect")}>Collect</Typography>
                    <Typography sx={determineStyle("/strategy/activities/prioritize")} onClick={() => handleNavigation("/strategy/activities/prioritize")}>Prioritize</Typography>
                </Box>
            </Box>
            <Typography sx={entryStyle}>Research</Typography>
            <Box sx={{ml:2, mb: 2}}>
                <Typography sx={determineStyle("/research/behaviourchain")} onClick={() => handleNavigation("/research/behaviourchain")}>Behaviour Chain</Typography>
                <Typography sx={determineStyle("/research/users")} onClick={() => handleNavigation("/research/users")}>User Research</Typography>
                <Typography sx={determineStyle("/research/doesfit")} onClick={() => handleNavigation("/research/doesfit")}>Gamification Fit</Typography>
                <Typography sx={determineStyle("/research/profile")} onClick={() => handleNavigation("/research/profile")}>Profile</Typography>
            </Box>
            <Typography sx={entryStyle}>Synthesis</Typography>
            <Box sx={{ml:2, mb: 2}}>
                <Typography sx={determineStyle("/synthesis/skillatom")} onClick={() => handleNavigation("/synthesis/skillatom")}>Create Skill Atom</Typography>
                <Typography sx={determineStyle("/synthesis/identify")} onClick={() => handleNavigation("/synthesis/identify")}>Identify Problems</Typography>
            </Box>
            <Typography sx={entryStyle}>Ideation</Typography>
            <Box sx={{ml:2, mb: 2}}>
                <Typography sx={determineStyle("/ideation/focusquestions")} onClick={() => handleNavigation("/ideation/focusquestions")}>Focus Questions</Typography>
                <Typography sx={determineStyle("/ideation/clustering")} onClick={() => handleNavigation("/ideation/clustering")}>Cluster & Finalize Ideas</Typography>
            </Box>
            {/* <Button disabled={uploadDisabled} sx={{width: "100%"}} variant="contained"
                onClick={uploadData}
            >Submit</Button> */}
        </Paper>
    )
}