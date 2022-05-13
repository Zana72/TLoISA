import { Check, Edit } from '@mui/icons-material';
import { TextField, Box, Typography, Paper, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function GoalsAndMetrics(props) {

    const [localGoal, setLocalGoal] = useState("");
    const [localMetric, setLocalMetric] = useState("");
    const [goalWriting, setGoalWriting] = useState(false);
    const [metricWriting, setMetricWriting] = useState(false);

    useEffect(() => {
        setLocalGoal(props.goal);
    }, [props.goal])

    useEffect(() => {
        setLocalMetric(props.metric);
    }, [props.metric])

    const saveGoal = () => {
        props.setGoal(localGoal);
    }

    const saveMetric = () => {
        props.setMetric(localMetric);
    }

    const renderElement = (title, isWriting, setIsWriting, value, setValue, placeholder, save) => {

        if (isWriting) {
            return(
                <Paper sx={{
                    display: "flex", flexDirection: "column", p: 5, mb: 4, alignItems: "center", 
                    justifyContent: "space-between", width: "20rem"
                }}>
                    <Typography variant="h3" sx={{mb: 2}}>
                        {title}
                    </Typography>
                    <TextField fullWidth variant="standard" value={value} onChange={e => {setValue(e.target.value)}} placeholder={placeholder} required multiline/>
                    <IconButton sx={{mt: 2, width: "fit-content"}} color="primary"
                        onClick={() => {
                            setIsWriting(false);
                            save();
                        }}
                    >
                        <Check />
                    </IconButton>
                </Paper>
            )
        } else {
            return(
                <Paper sx={{
                    display: "flex", flexDirection: "column", p: 5, mb: 4, alignItems: "center", 
                    justifyContent: "space-between", width: "20rem"
                }}>
                    <Typography variant="h3" sx={{mb: 2}}>
                        {title}
                    </Typography>
                    <Typography align='center'>{value}</Typography>
                    <IconButton sx={{mt: 2, width: "fit-content"}} color="primary"
                        onClick={() => {
                            setIsWriting(true);
                        }}
                    >
                        <Edit />
                    </IconButton>
                </Paper>
            )
        }
    }

    return(
        <Box>
            <Typography variant="h2">Define Goal and Metric</Typography>
            <Box sx={{display: "flex", m: 2, justifyContent: "space-evenly", mt: 5, flexWrap: "wrap"}}>
                {renderElement("Define a goal", goalWriting, setGoalWriting, localGoal, setLocalGoal, "goal...", saveGoal)}
                {renderElement("Define a metric", metricWriting, setMetricWriting, localMetric, setLocalMetric, "metric...", saveMetric)}
            </Box>
        </Box>

    )
}