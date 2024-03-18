import { Avatar, Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ChatListBodyBox, ChatListBodySingleCard, ChatListBodySingleCardInnerBox, ChatListSingleCardInnerTypography } from '../../UserStyle'
import { setSocket, setChat } from '../../../Context/UseContext'
import { Link } from 'react-router-dom'


const SearchComponent = () => {
  const { socket } = useContext(setSocket)
  const { setCheckChat } = useContext(setChat)
  const [userList, setUserList] = useState([])


  useEffect(() => {
    if (!socket) return

    socket.on('fromServer-searchUser', ({ ChatListlist }) =>
      setUserList(ChatListlist)
    )
  }, [socket])
  return (
    <Box sx={ChatListBodyBox}>
      {userList.map((list, key) => (
        <Link to={`/user/Chat/ChatComponent/${list.chatListId}`} onClick={() => setCheckChat(true)} key={key} style={{ textDecoration: 'none' }} >
          <Box sx={ChatListBodySingleCard}   >
            <Box sx={ChatListBodySingleCardInnerBox}>
              <Avatar />
              <Box sx={ChatListSingleCardInnerTypography}>
                <Typography>{list.name}</Typography>
              </Box>
            </Box>
          </Box>
        </Link>
      ))}
    </Box>
  )
}

export default SearchComponent