import { Box, Button, Card, Stack, TextField } from '@mui/material'
import React from 'react';
import './AddCollage.scss';

const AddCollage = () => {
    return (

        <Box className='Box' sx={{display:'center',justifyContent:'center',m:5 }}>
            
            <Card className='Card' sx={{ width: 400, height: 400 }}>
            <div className='text'>Add College</div>
                <Stack sx={{ m: 5 }} gap={3} direction={'column'}>
                    <TextField id="standard-basic" label="Name of the College" variant="standard" />
                    <TextField id="standard-basic" label="Email Id" variant="standard" />
                    <TextField id="standard-basic" label="Password" variant="standard" />
                    <Button className='button' variant="outlined">Add</Button>
                </Stack>


            </Card>
        </Box>
    )
}

export default AddCollage
