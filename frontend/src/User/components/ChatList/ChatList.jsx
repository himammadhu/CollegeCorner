import { Avatar, Box, Card, Typography, useMediaQuery } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import {
    ChatListBodyBox, ChatListBodySingleCard,
    ChatListBodySingleCardInnerBox,
    ChatListSingleCardInnerTypography,
    ChatListHeaderBoxResponsive, // Import responsive style

} from '../../UserStyle'
import { setSocket, setChat } from '../../../Context/UseContext'
import axios from 'axios'




const ChatList = () => {
    const { setCheckChat } = useContext(setChat)
    const matchesSmallScreen = useMediaQuery('(max-width: 768px)'); // Check if screen is small

    const [friends, setFriends] = useState([]);
    const { socket } = useContext(setSocket)
    const Id = sessionStorage.getItem('uId')

    useEffect(() => {
        if (!socket) return

        socket.on('myFriendsFromSever', ({ usersData }) =>
            setFriends(usersData)
        )
    }, [socket])

    const fetchFollowers = () => {
        axios.get(`http://localhost:5000/ChatListFriends/${Id}`).then((response) => {
            console.log(response.data.ChatListlist);
            setFriends(response.data.ChatListlist)

        })
    }

    


    useEffect(() => {
        fetchFollowers()
    }, [])

    return (
        <Card sx={matchesSmallScreen ? ChatListHeaderBoxResponsive : ChatListBodyBox}>
            {
                friends.map((friend, key) => (
                    <Box sx={ChatListBodySingleCard} key={key} onClick={() => setCheckChat(friend)}  >
                        <Box sx={ChatListBodySingleCardInnerBox}>
                            <Avatar />
                            <Box sx={ChatListSingleCardInnerTypography}>
                                <Typography>{friend.name}</Typography>
                            </Box>
                        </Box>
                    </Box>

                ))
            }


        </Card>
    )
}

export default ChatList