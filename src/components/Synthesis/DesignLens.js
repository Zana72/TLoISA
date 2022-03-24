import { Card, CardHeader, CardContent, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import React from 'react';
import { Add, Hiking } from '@mui/icons-material';

export default function DesignLens(props) {

    const renderQuestions = () => {
        let questions = [];

        for (let question of props.questions) {
            questions.push(
                <ListItem>
                    <ListItemText>{question}</ListItemText>
                </ListItem>
            )
        }

        return questions;
    }

    return(
        <Card sx={{width: "20rem", m: 4, ml: 0}}>
            <CardHeader sx={{bgcolor: "primary.light"}} title={props.title} subheader={props.motivator} action={<AddProblem addProblem={props.addProblem}/>} avatar={<Hiking fontSize="large"/>} titleTypographyProps={{fontSize: "1.2rem"}}/>
            <CardContent>
                <Typography>{props.description}</Typography>
                <List>
                    {/* {renderQuestions()} */}
                </List>
            </CardContent>
        </Card>
    )
}

function AddProblem(props) {

    return(
        <IconButton onClick={props.addProblem}>
            <Add/>
        </IconButton>
    )
}