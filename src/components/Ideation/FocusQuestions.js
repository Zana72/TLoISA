import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Grid, Button } from '@mui/material';
import DesignLens from './DesignLens';
import AddText from '../Helper/AddText';

export default function FocusQuestions(props) {

    const [activeLens, setActiveLens] = useState("");
    const [activeProblems, setActiveProblems] = useState([]);
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        if (props.synthesis) {
            let keys = Object.keys(props.synthesis.problems);
            if (keys.length > 0) {
                setActiveLens(props.synthesis.problems[keys[0]].designlens)
                setActiveProblems(props.synthesis.problems[keys[0]].problems)
            }
        }
    }, [])

    const renderProblems = () => {

        let problems = [];

        for (let index in activeProblems) {
            problems.push(
                <Card sx={{width: "20rem", m: 3}}>
                    <CardHeader title={"Problem " + (parseInt(index) + 1)}/>
                    <CardContent>
                        <Typography>{activeProblems[index]}</Typography>
                    </CardContent>
                </Card>
            )
        }
        return problems;
    }

    return(
        activeLens &&
        <Box>
            <Typography variant="h2">Focus Questions</Typography>
            <Grid container>
                <Grid item xs={6}>
                    <Box sx={{display: "flex", flexWrap: "wrap"}}>
                        {renderProblems()}
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <DesignLens 
                        title={activeLens.title}
                        motivator={activeLens.motivator}
                        description={activeLens.description}
                        questions={activeLens.questions}
                    />
                </Grid>
            </Grid>
            <Box>
                <Button>Nächste Design Lens</Button>
            </Box>
            <Box sx={{mt: 3, mr: 3}}>
                <Typography variant="h3">Brainstorming</Typography>
                <Box sx={{display: "flex", alignItems:"center"}}>
                    <Typography sx={{mr: 2}}>Idea 1:</Typography>
                    <AddText placeholder="idea..." onAdd={() => {}}/>
                </Box>
            </Box>

        </Box>


    )
}