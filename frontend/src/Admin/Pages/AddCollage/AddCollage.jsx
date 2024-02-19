import { Box, Button, Card, Stack, TextField } from '@mui/material'
import React from 'react'

const AddCollage = () => {
    return (

        <Box sx={{display:'center',justifyContent:'center',m:5 }}>
            <Card sx={{ width: 400, height: 400 }}>
                <Stack sx={{ m: 5 }} gap={3} direction={'column'}>
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                    <Button variant="outlined">Outlined</Button>
                </Stack>


            </Card>
        </Box>
    )
}

export default AddCollage
