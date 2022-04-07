import React, { useState } from 'react';
import { Delete, ArrowBack, ArrowForward } from '@mui/icons-material';
import { Typography, Box, Button, Grid, TextField, IconButton } from '@mui/material';
import SkillAtomPartStatic from './SkillAtomPartStatic';
import { lensesData } from '../../data/designLenses';
import DesignLens from './DesignLens';
import { skillAtomStatic } from '../../data/skillAtomStatic';
import ShowProfile from './ShowProfile';

const types = [
    "challenges", 
    "motivations", 
    "goals", 
    "actions", 
    "rules", 
    "feedback"
]

export default function Identify(props) {

    const [activeType, setActiveType] = useState(0);

    const setNextType = () => {
        setActiveType(getNextType());
    }

    const setPrevType = () => {
        setActiveType(getPrevType());
    }

    const getNextType = () => {
        if (activeType === types.length - 1 ) {
            return 0
        } else {
            return activeType + 1;
        }
    }

    const getPrevType = () => {
        if (activeType === 0 ) {
            return types.length - 1
        } else {
            return activeType - 1;
        }
    }

    const renderDesignLenses = () => {

        let dls = [];

        for (let lens of lensesData[types[activeType]]) {
            dls.push(
                <DesignLens key={lens.title} title={lens.title} motivator={lens.motivator} description={lens.description}
                            questions={lens.questions} addProblem={() => props.addProblem(lens)}
                />
            )
        }
        return dls;
    }

    const renderProblemFields = () => {
        return (
                <ProblemsField skillAtomPartTitle={types[activeType]} 
                                updateProblem={props.updateProblem} 
                                problems={props.synthesis.problems}
                />
        )
    }

    if (props.synthesis && Object.keys(props.synthesis).length > 0) {
        
        const points = props.synthesis[types[activeType]];

        return(
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <Typography variant="h2">Identify Problems</Typography>
                <ShowProfile top="1rem" right="2rem" profile={props.profile}/>
                <Grid container>
                    <Grid item xs={4}>
                        <Box sx={{mr: 5}}>
                            <Typography variant="h3">Problems</Typography>
                            <Box sx={{height: "70vh", overflow: "auto"}}>
                                {renderProblemFields()}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{m: "auto", display: "flex", flexDirection: "column"}}>
                            <Typography variant="h3">Skill Atom Part</Typography>
                            <Box sx={{display: "flex", width: "100%", justifyContent: "space-evenly"}}>
                                <Button sx={{width: "10rem"}} onClick={setPrevType} variant="contained" startIcon={<ArrowBack/>}>{types[getPrevType()]}</Button>
                                <SkillAtomPartStatic
                                    title={skillAtomStatic[types[activeType]].title}
                                    info={skillAtomStatic[types[activeType]].info}
                                    points={points}
                                    icon={skillAtomStatic[types[activeType]].icon}
                                />
                                <Button sx={{width: "10rem"}} onClick={setNextType} variant="contained" endIcon={<ArrowForward/>}>{types[getNextType()]}</Button>
                            </Box>

                        </Box>
                        <Box sx={{mt: 8}}>
                            <Typography variant="h3">Design Lenses</Typography>
                            <Box sx={{display: "flex", m: 2, flexWrap: "wrap"}}>
                                {renderDesignLenses()}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>


        )
    } else {
        return <Typography>Pick a target activity to proceed first</Typography>
    }
}

function ProblemsField(props) {

    const handleUpdate = (dlsTitle, index) => (e) => {
        props.updateProblem(props.problems[dlsTitle].designlens.title, index, e.target.value);
    }

    const renderProblems = () => {
        let problems = [];

        for (let dls of lensesData[props.skillAtomPartTitle]) {
            if (props.problems[dls.title]) {
                problems.push(
                    <Typography key={dls.title}>{dls.title}: </Typography>
                )
                for (let index in props.problems[dls.title].problems) {
                    let problem = props.problems[dls.title].problems[index];
                    problems.push(
                        <Box sx={{mb: 2, p: 1, display: "flex"}} key={index + dls.title}>
                            <TextField placeholder="Problem..." value={problem} onChange={handleUpdate(dls.title, index)} multiline fullWidth/>
                            <IconButton><Delete/></IconButton>
                        </Box>
                    )
                }
            }
        }

        return problems;
    }

    if (props.problems) {
        return(
            <Box>
                {renderProblems()}
            </Box>
        )
    } else {
        return null;
    }
}