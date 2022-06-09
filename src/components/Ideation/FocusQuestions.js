import React, { useState } from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Grid, Button, Paper, IconButton } from '@mui/material';
import DesignLens from './DesignLens';
import AddText from '../Helper/AddText';
import { Delete } from '@mui/icons-material';

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
                <Card sx={{width: "20rem", m: 3}} key={index}>
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
            for (let index in props.ideas[props.activityId][activeLens.title]) {
                let idea = props.ideas[props.activityId][activeLens.title][index]
                ideas.push(
                    <Paper key={index} sx={{
                        m: 2, bgcolor: "secondary.light", p: 2, maxWidth:"12rem", height: "fit-content",
                        display: "flex", alignItems: "center", justifyContent: "space-between"
                    }} elevation={4}>
                        <Typography align="center">{idea.name}</Typography>
                        <IconButton onClick={
                            () => {props.removeIdea(activeLens.title, index)}
                        }>
                            <Delete/>
                        </IconButton>
                    </Paper>

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
                        <Grid item xs={5}>
                            <Box sx={{mr: 3, mb: 3}}>
                                <Typography variant="h3">Brainstorming</Typography>
                                <Box sx={{display: "flex", flexWrap: "wrap"}}>
                                    {renderIdeas()}
                                </Box>
                                <Box sx={{display: "flex", alignItems:"center"}}>
                                    <Typography sx={{mr: 2}}>New Idea:</Typography>
                                    <AddText placeholder="idea..." onAdd={text => {props.addIdea(activeLens.title, text)}}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left"}}>
                                <Box>
                                    <Button onClick={moveToNextLens}>Next design lens</Button>
                                </Box>
                                <DesignLens 
                                    title={activeLens.title}
                                    motivator={activeLens.motivator}
                                    description={activeLens.description}
                                    questions={activeLens.questions}
                                />
                                <Box sx={{display: "flex", flexWrap: "wrap"}}>
                                    {renderProblems()}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                :
                <Typography>Problems are needed to ideate on solutions.</Typography>
            }
        </Box>


    )
}