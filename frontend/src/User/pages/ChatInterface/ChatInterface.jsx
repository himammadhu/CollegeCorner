import React from 'react'
import ChatComponent from '../../components/ChatComponent/ChatComponent'
import ChatList from '../../components/ChatList/ChatList'
import { Box, Card } from '@mui/material'
import ChatNav from '../../components/ChatNav/ChatNav'

const ChatInterface = () => {
  return (
    <Box sx={{display:'flex'}}>
        <Box sx={{width:'23vw'}}>
        <ChatNav/>

        </Box>
        <Box sx={{width:'77vw'}}>
        <ChatComponent/>

        </Box>

    </Box>
  )
}

export default ChatInterface
