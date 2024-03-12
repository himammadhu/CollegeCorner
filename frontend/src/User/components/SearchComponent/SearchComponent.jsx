import { Avatar, Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ChatListBodyBox, ChatListBodySingleCard, ChatListBodySingleCardInnerBox, ChatListSingleCardInnerTypography } from '../../UserStyle'
import { setSocket,setChat } from '../../../Context/UseContext'


const SearchComponent = () => {
  const { socket } = useContext(setSocket)
  const { setCheckChat } = useContext(setChat)
  const [userList, setUserList] = useState([])


  useEffect(() => {
    if (!socket) return

    socket.on('fromServer-searchUser', ({ usersData }) =>
      setUserList(usersData)
    )
  }, [socket])
  return (
    <Box sx={ChatListBodyBox}>
      {userList.map((list, key) => (
        <Box sx={ChatListBodySingleCard} onClick={() => setCheckChat(list)}  key={key} >
          <Box sx={ChatListBodySingleCardInnerBox}>
            <Avatar />
            <Box sx={ChatListSingleCardInnerTypography}>
              <Typography>{list.name}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default SearchComponent