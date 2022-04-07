import React, { useState } from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Grid, Button } from '@mui/material';
import DesignLens from './DesignLens';
import AddText from '../Helper/AddText';

export default function FocusQuestions(props) {

    const [activeLensIter, setActiveLensIter] = useState(0);

    const keys = Object.keys(props.synthesis.problems);
    const activeLens = (keys.length > 0) ? props.synthesis.problems[keys[activeLensIter]].designlens : null
    const activeProblems = (keys.length > 0) ? props.synthesis.problems[keys[activeLensIter]].problems : []

    const moveToNextLens = () => {
        if (activeLensIter < keys.length-1) {
            setActiveLensIter(activeLensIter + 1);
        } else {
            setActiveLensIter(0);
        }
    }

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

    const renderIdeas = () => {

        let ideas = [];

        if (props.ideas[props.activityId] && props.ideas[props.activityId][activeLens.title]) {
            for (let idea of props.ideas[props.activityId][activeLens.title]) {
                ideas.push(
                    <Box sx={{m: 2, bgcolor: "secondary.light", p: 2, borderWidth: "2px", borderStyle: "solid"}}>
                        <Typography>{idea.name}</Typography>
                    </Box>

                )
            }
        }

        return ideas;
    }

    return(
        <Box>
            <Typography variant="h2">Focus Questions</Typography>
            {
                activeLens ?
                <Box>
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
                        <Button onClick={moveToNextLens}>Nächste Design Lens</Button>
                    </Box>
                    <Box sx={{mt: 3, mr: 3}}>
                        <Typography variant="h3">Brainstorming</Typography>
                        <Box sx={{display: "flex", flexWrap: "wrap"}}>
                            {renderIdeas()}
                        </Box>
                        <Box sx={{display: "flex", alignItems:"center"}}>
                            <Typography sx={{mr: 2}}>New Idea:</Typography>
                            <AddText placeholder="idea..." onAdd={text => {props.addIdea(activeLens.title, text)}}/>
                        </Box>
                    </Box>
                </Box>
                :
                <Typography>Problems are needed to ideate on solutions.</Typography>
            }
        </Box>


    )
}