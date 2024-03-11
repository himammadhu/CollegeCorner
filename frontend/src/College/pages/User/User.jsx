import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./user.scss";

const User = () => {

   
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hierarchy, setHierarchy] = useState('');
    const [batch, setBatch] = useState('');
    const [hierarchyData, setHierarchyData] = useState([]);
    const [batchData, setBatchData] = useState([]);

    const addData = () => {
        const CollegeId = sessionStorage.getItem('cId')
        const data = {
            name,
            email,
            password,
            hierarchy,
            batch,
            CollegeId
        }

        axios.post('http://localhost:5000/User', data).then((response) => {
            console.log(response.data);
            setBatch('')
            setEmail('')
            setHierarchy('')
            setName('')
            setPassword('')
        })
    }

    const fetchHeirarchy = () => {
        axios.get('http://localhost:5000/Hierarchy').then((response) => {
            console.log(response.data.Hierarchylist);
            setHierarchyData(response.data.Hierarchylist)
        })
    }

    const fetchBatch = () => {
        axios.get('http://localhost:5000/Batch').then((response) => {
            console.log(response.data.Batchlist);
            setBatchData(response.data.Batchlist)
        })
    }

    useEffect(() => {
        fetchHeirarchy()
        fetchBatch()
    }, [])
    return (
        <Box className="box" sx={{ display: 'center', justifyContent: 'center', m: 5 }}>

            <Card className='card' sx={{ width: 500 }}>
                <Typography className='Type' variant='h5' align='center' sx={{ p: 3 }}>Add User</Typography>
                <Stack className='Type' sx={{ m: 5 }} gap={3} direction={'column'}>
                    <TextField  id="standard-basic" label="Name of the User" variant="standard" onChange={(e) => setName(e.target.value)} />
                    <TextField  id="standard-basic" label="Email Id" variant="standard" onChange={(e) => setEmail(e.target.value)} />
                    <TextField id="standard-basic" label="Password" variant="standard" onChange={(e) => setPassword(e.target.value)} />
                    <FormControl variant="standard" sx={{ m: 1 }}>
                        <InputLabel className='Type' id="demo-simple-select-standard-label">Hierarchy</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={hierarchy}
                            onChange={(event) => setHierarchy(event.target.value)}
                            label="Hierarchy"
                        >
                            {
                                hierarchyData.map((data, key) => (
                                    <MenuItem key={key} value={data._id}> {data.Name} </MenuItem>

                                ))
                            }

                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1 }}>
                        <InputLabel className='Type' id="demo-simple-select-standard-label">Batch</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={batch}
                            onChange={(event) => setBatch(event.target.value)}
                            label="Batch"
                        >
                            {
                                batchData.map((data, key) => (
                                    <MenuItem key={key} value={data._id}> {data.Name} </MenuItem>

                                ))
                            }

                        </Select>
                    </FormControl>
                    <Button className='button' variant="outlined" onClick={addData}>Add</Button>
                </Stack>
            </Card>
        </Box>
    )
}

export default User
