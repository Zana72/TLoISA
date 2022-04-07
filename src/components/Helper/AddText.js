import { Add } from '@mui/icons-material';
import { IconButton, TextField, Box } from '@mui/material';
import React, {useState} from 'react';

export default function AddText(props) {

    const [text, setText] = useState("");

    const handleAdd = () => {
        setText("");
        props.onAdd(text);
    }

    return(
        <Box sx={{display: "flex"}}>
            <TextField placeholder={props.placeholder} variant="standard" value={text} onChange={e => setText(e.target.value)}/>
            <IconButton onClick={handleAdd} disabled={text === ""}><Add /></IconButton>
        </Box>
        
    )
}