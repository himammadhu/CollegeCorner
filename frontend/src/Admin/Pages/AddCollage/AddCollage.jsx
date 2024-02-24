import { Box, Button, Card, Stack, TextField } from '@mui/material'
import React, { useState } from 'react';
import './AddCollage.scss';
import axios from 'axios';

const AddCollage = () => {

    const [name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const addData = () => {
        const data = {
            name,
            email,
            password
        }

        axios.post('http://localhost:5000/College', data).then((response) => {
            console.log(response.data);
        })
    }

    return (

        
        
        <Box className='Box' sx={{display:'center',justifyContent:'center',m:5 }}>
            
            <Card className='Card' sx={{ width: 400, height: 400 }}>
            <div className='text'>Add College</div>
                <Stack sx={{ m: 5 }} gap={3} direction={'column'}>
                    <TextField id="standard-basic" label="Name of the College" variant="standard" onChange={(e) => setName(e.target.value)} />
                    <TextField id="standard-basic" label="Email Id" variant="standard" onChange={(e) => setEmail(e.target.value)} />
                    <TextField id="standard-basic" label="Password" variant="standard" onChange={(e) => setPassword(e.target.value)} />
                    <Button className='button' variant="outlined" onClick={addData}>Add</Button>
                </Stack>
            </Card>
        </Box>
    )
}

export default AddCollage
