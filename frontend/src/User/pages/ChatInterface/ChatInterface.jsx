import React, { useState } from 'react'
import ChatComponent from '../../components/ChatComponent/ChatComponent'
import ChatList from '../../components/ChatList/ChatList'
import { Box, Card, useMediaQuery } from '@mui/material'
import ChatNav from '../../components/ChatNav/ChatNav'
import { setChat } from '../../../Context/UseContext'
import { Routes, Route } from 'react-router-dom'
import { ChatListHeaderBoxResponsive, ChatListMainContainer } from '../../UserStyle'
import { useLocation } from 'react-router-dom';

const ChatInterface = () => {
  const [checkChat, setCheckChat] = useState(false)
  const { pathname } = useLocation(); // Use the useLocation hook and destructure pathname

  const matchesSmallScreen = useMediaQuery('(max-width: 768px)'); // Check if screen is small
  const isChatComponentPage = pathname.startsWith('/user/Chat/ChatComponent');

  return (
    <Box sx={{ display: 'flex' }}>
      <setChat.Provider value={{ checkChat, setCheckChat }}>
        {
          !isChatComponentPage ? (<Box sx={matchesSmallScreen?ChatListHeaderBoxResponsive:ChatListMainContainer}>
            <ChatNav />

          </Box>) : (
            <Box sx={{ width: '98vw' }}>
              <Routes>
                <Route path='/ChatComponent/:CId' element={<ChatComponent />} />
              </Routes>


            </Box>
          )
        }

        {/* {!matchesSmallScreen  &&  */}


      </setChat.Provider>

    </Box>
  )
}

export default ChatInterface
