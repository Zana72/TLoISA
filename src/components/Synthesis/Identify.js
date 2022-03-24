import React, { useState } from 'react';
import { Delete, Hiking, ArrowBack, ArrowForward } from '@mui/icons-material';
import { Typography, Box, Button, Grid, TextField, IconButton } from '@mui/material';
import SkillAtomPartStatic from './SkillAtomPartStatic';
import { lensesData } from '../../data/designLenses';
import DesignLens from './DesignLens';
import { skillAtomStatic } from '../../data/skillAtomStatic';

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
                <DesignLens title={lens.title} motivator={lens.motivator} description={lens.description}
                            questions={lens.questions} addProblem={() => props.addProblem(lens)}
                />
            )
        }
        return dls;
    }

    const renderProblemFields = () => {
        let problemFields = [];

        for (let key in props.synthesis.problems) {
            problemFields.push(
                <ProblemsField key={key} dlTitle={key} updateProblem={props.updateProblem} problems={props.synthesis.problems[key]}/>
            )
        }

        return problemFields;
    }

    if (props.synthesis && Object.keys(props.synthesis).length > 0) {
        
        const points = props.synthesis[types[activeType]];

        return(
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <Typography variant="h2">Identify Problems</Typography>
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
                            <Box sx={{display: "flex"}}>
                                <Button onClick={setPrevType} variant="contained" startIcon={<ArrowBack/>}>{types[getPrevType()]}</Button>
                                <SkillAtomPartStatic
                                    title={skillAtomStatic[types[activeType]].title}
                                    info={skillAtomStatic[types[activeType]].info}
                                    points={points}
                                    icon={skillAtomStatic[types[activeType]].icon}
                                />
                                <Button onClick={setNextType} variant="contained" endIcon={<ArrowForward/>}>{types[getNextType()]}</Button>
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

    const handleUpdate = index => (e) => {
        console.log(props.problems.designlens);
        props.updateProblem(props.problems.designlens.title, index, e.target.value);
    }

    const renderProblems = () => {
        let problems = [];

        for (let index in props.problems.problems) {
            let problem = props.problems.problems[index];
            problems.push(
                <Box sx={{mb: 2, p: 1, display: "flex"}} key={index}>
                    <TextField placeholder="Problem..." value={problem} onChange={handleUpdate(index)} multiline fullWidth/>
                    <IconButton><Delete/></IconButton>
                </Box>
            )
        }

        return problems;
    }

    return(
        <Box>
            <Typography>{props.dlTitle}: </Typography>
            {renderProblems()}
        </Box>
    )
}