import { Avatar, Box, Card, Typography, useMediaQuery } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import {
    ChatListBodyBox, ChatListBodySingleCard,
    ChatListBodySingleCardInnerBox,
    ChatListSingleCardInnerTypography,

} from '../../UserStyle'
import { setSocket, setChat } from '../../../Context/UseContext'
import axios from 'axios'
import { Link } from 'react-router-dom'




const ChatList = () => {
    const { setCheckChat } = useContext(setChat)

    const [friends, setFriends] = useState([]);
    const { socket } = useContext(setSocket)
    const Id = sessionStorage.getItem('uId')

    useEffect(() => {
        if (!socket) return

        socket.on('myFriendsFromSever', () => {
            fetchFollowers()
        }
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
        <Card sx={ChatListBodyBox}>
            {
                friends.map((friend, key) => (
                    <Link to={`/user/Chat/ChatComponent/${friend.chatListId}`} onClick={() => setCheckChat(true)} key={key} style={{ textDecoration: 'none' }} >
                        <Box sx={ChatListBodySingleCard}   >
                            <Box sx={ChatListBodySingleCardInnerBox}>
                                <Avatar />
                                <Box sx={ChatListSingleCardInnerTypography}>
                                    <Typography>{friend.name}
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {friend.latestChat && friend.latestChat.ChatContent}
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Link>

                ))
            }


        </Card>
    )
}

export default ChatList