import React, { useState } from 'react'
import ChatComponent from '../../components/ChatComponent/ChatComponent'
import ChatList from '../../components/ChatList/ChatList'
import { Box, Card } from '@mui/material'
import ChatNav from '../../components/ChatNav/ChatNav'
import { setChat } from '../../../Context/UseContext'

const ChatInterface = () => {
  const [checkChat, setCheckChat] = useState(null)

  return (
    <Box sx={{ display: 'flex' }}>
      <setChat.Provider value={{checkChat,setCheckChat}}>

        <Box sx={{ width: '23vw' }}>
          <ChatNav />

        </Box>
        <Box sx={{ width: '77vw' }}>
          {checkChat && <ChatComponent />}

        </Box>
      </setChat.Provider>

    </Box>
  )
}

export default ChatInterface
