import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const AddHierarchy = () => {
    const [Name, setName] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            Name
        }

        axios.post('http://localhost:5000/Hierarchy', data).then((response) => {
            console.log(response.data);
            setName('')
        })
    }


    return (

        <Box sx={{ display: 'center', justifyContent: 'center', m: 5 }} component={'form'} onSubmit={handleSubmit}>

            <Card sx={{ width: 400}}>
                <Typography variant='h5' align='center' sx={{p:3}} >Add Hierarchy</Typography>
                <Stack sx={{ m: 5 }} gap={3} direction={'column'}>
                    <TextField id="standard-basic" label="Hierarchy" variant="standard" value={Name} onChange={(e) => setName(e.target.value)} />

                    <Button type="submit" variant="outlined" >Save</Button>
                </Stack>
            </Card>
        </Box>
    )
}

export default AddHierarchy
