import React from 'react'
import ChatComponent from '../../components/ChatComponent/ChatComponent'
import ChatList from '../../components/ChatList/ChatList'
import { Box, Card } from '@mui/material'

const ChatInterface = () => {
  return (
    <Box sx={{display:'flex'}}>
        <Box sx={{width:'23vw'}}>
        <ChatList/>

        </Box>
        <Box sx={{width:'73vw'}}>
        <ChatComponent/>

        </Box>

    </Box>
  )
}

export default ChatInterface
