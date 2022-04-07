import { TextField, Box, Typography } from '@mui/material';
import React from 'react';

export default function GoalsAndMetrics(props) {

    return(
        <Box>
            <Typography variant="h2">Define Goal and Metric</Typography>
            <Box sx={{display: "flex", m: 2}}>
                <Box sx={{display: "flex", flexDirection: "column", mr: 4}}>
                    <Typography>
                        Define a goal
                    </Typography>
                    <TextField value={props.goal} onChange={e => {props.setGoal(e.target.value)}} placeholder="goal..." required multiline/>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Typography>
                        Define a metric
                    </Typography>
                    <TextField value={props.metric} onChange={e => {props.setMetric(e.target.value)}} placeholder="metric..." required multiline/>
                </Box>
            </Box>
        </Box>

    )
}