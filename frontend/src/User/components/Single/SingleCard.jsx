import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, Typography } from '@mui/material'
import axios from 'axios'

const SingleCard = ({ data }) => {
    const [check, setCheck] = useState(false)
    const handleAddRequest = (Id) => {
        const dataList = {
            ChatListUserOne: sessionStorage.getItem('uId'),
            ChatListUserTwo: Id
        }
        axios.post('http://localhost:5000/ChatList', dataList).then((response) => {
            console.log(response.data.message);
             setCheck(!check)

        })
    }
    // const handleRemoveRequest = () => {
    //     const dataList = {
    //         ChatListUserOne: sessionStorage.getItem('uId'),
    //         ChatListUserTwo: Id
    //     }
    //     axios.post('http://localhost:5000/ChatList', dataList).then((response) => {
    //         console.log(response.data.message);
    //          setCheck(!check)

    //     })
    // }
    
    useEffect(() => {
        setCheck(data.hasRoom)
    }, [])
    return (
        <Card sx={{ display: 'flex', px: 5,m:2 }} className='searchBox'>

            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar sx={{ width: 50, height: 50 }} />

            </Box>
            <Box sx={{ p: 3, width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant='h6'>
                        {data.name}
                    </Typography>
                    <Typography >
                        {data.userName}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Button size='small'  variant={ check? "outlined" : "contained"} onClick={() => handleAddRequest(data._id)}>{check ? 'UnFollow' : 'Follow'}</Button>
                </Box>
            </Box>


        </Card>
    )
}

export default SingleCard
