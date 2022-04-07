import React, { useEffect, useState } from 'react';
import { Delete, ArrowBack, ArrowForward, ArrowForwardIos, ArrowBackIosNew } from '@mui/icons-material';
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
    const [activeLens, setActiveLens] = useState(0);

    useEffect(() => {
        setActiveLens(0);
    }, [activeType])

    const setNextType = () => {
        setActiveType(getNextType());
    }

    const setPrevType = () => {
        setActiveType(getPrevType());
    }

    const getNextLens = () => {
        if (activeLens === lensesData[types[activeType]].length - 1) {
            setActiveLens(0);
        } else {
            setActiveLens(activeLens + 1);
        }
    }

    const getPrevLens = () => {
        if (activeLens === 0) {
            setActiveLens(lensesData[types[activeType]].length - 1);
        } else {
            setActiveLens(activeLens - 1);
        }
    }

    const isOnlyOneLens = () => {
        return (lensesData[types[activeType]].length === 1);
    }

    const isNoLens = () => {
        return (lensesData[types[activeType]].length === 0);
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

    const renderDesignLense = () => {

        if (lensesData[types[activeType]].length > 0 && lensesData[types[activeType]].length > activeLens) {
            let lens = lensesData[types[activeType]][activeLens];
            return (
                <Box sx={{display: "flex"}}>
                    <Typography>{activeLens+1}.</Typography>
                    <DesignLens key={lens.title} title={lens.title} motivator={lens.motivator} description={lens.description}
                        questions={lens.questions} addProblem={() => props.addProblem(lens)} />
                </Box>
            )
        } else {
            return null;
        }
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
                            <Box sx={{display: "flex", width: "100%", justifyContent: "space-evenly", alignItems: "center"}}>
                                <Button sx={{width: "10rem", height: "fit-content"}} onClick={setPrevType} variant="contained" startIcon={<ArrowBack/>}>{types[getPrevType()]}</Button>
                                <SkillAtomPartStatic
                                    title={skillAtomStatic[types[activeType]].title}
                                    info={skillAtomStatic[types[activeType]].info}
                                    points={points}
                                    icon={skillAtomStatic[types[activeType]].icon}
                                />
                                <Button sx={{width: "10rem", height: "fit-content"}} onClick={setNextType} variant="contained" endIcon={<ArrowForward/>}>{types[getNextType()]}</Button>
                            </Box>

                        </Box>
                        <Box sx={{mt: 8}}>
                            <Typography variant="h3">Design Lenses</Typography>
                            {
                                !isNoLens()
                                ?
                                <Box sx={{display: "flex", m: 2, flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}>
                                    <IconButton sx={{height: "fit-content"}} onClick={getPrevLens} disabled={isOnlyOneLens()}>
                                        <ArrowBackIosNew />
                                    </IconButton>
                                    {renderDesignLense()}
                                    <IconButton sx={{height: "fit-content"}} onClick={getNextLens} disabled={isOnlyOneLens()}>
                                        <ArrowForwardIos />
                                    </IconButton>
                                </Box>
                                :
                                <Typography>There is no lens for this part.</Typography>
                            }
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