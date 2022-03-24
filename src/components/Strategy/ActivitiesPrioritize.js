import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Box, IconButton, Button } from '@mui/material';
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { grey } from '@mui/material/colors';

export default function ActivitiesPrioritize(props) {

    const moveUp = (prioStr) => {

        const prio = parseInt(prioStr);
        if (prio > 0) {
            props.swapActivityPair(prio, prio-1);
        }
    }

    const moveDown = (prioStr) => {
        const prio = parseInt(prioStr);
        if (prio < props.activityTargetPairs.length-1) {
            props.swapActivityPair(prio, prio+1);
        }
    }

    const getRowColor = (id) => {
        if (props.activeActivityId === id)
        {
            return "primary.light";
        } else {
            return grey[0];
        }
    }


    return(
        <Box sx={{m: 3}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Target Group</TableCell>
                            <TableCell>Activity</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Move</TableCell>
                            <TableCell>Pick Focus Activity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.activityTargetPairs.map((row) => (
                            <TableRow
                                key={row.priority}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: getRowColor(row.id) }}
                            >
                            <TableCell>{row.targetGroup}</TableCell>
                            <TableCell>{row.activity}</TableCell>
                            <TableCell>{row.priority}</TableCell>
                            <TableCell>
                                {   
                                    row.priority > 0 &&
                                    <IconButton onClick={() => moveUp(row.priority)}><ArrowUpwardIcon /></IconButton>
                                }
                                {
                                    row.priority < (props.activityTargetPairs.length-1) &&
                                    <IconButton onClick={() => moveDown(row.priority)}><ArrowDownwardIcon /></IconButton>
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    (props.activeActivityId !== row.id) &&
                                    <Button onClick={() => props.pickActivity(row)}>Pick</Button>
                                }
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}