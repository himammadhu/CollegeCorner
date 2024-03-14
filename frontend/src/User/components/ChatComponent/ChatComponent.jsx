import {
    Box,
    Card,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Typography,
  } from '@mui/material'
  import React, { useContext, useEffect, useState } from 'react'
  import {
    ChatComponentChatCard,
    ChatComponentInnerBoxBottom,
    ChatComponentInnerBoxChat,
    ChatComponentInnerBoxTop,
    ChatComponentTopInnerBoxLeft,
    ChatComponentTopInnerBoxRight,
    ChatContainerMainContainer,
  } from '../../UserStyle'
//   import Navbar from './Navbar'
  import SendIcon from '@mui/icons-material/Send'
import UserNavBar from '../UserNavBar/UserNavBar'
import { setChat,setSocket } from '../../../Context/UseContext'

  
  const ChatComponent = () => {
    const { checkChat } = useContext(setChat)
    const { socket } = useContext(setSocket)

    const [message, setMessage] = useState('')
    const [chatData, setChatData] = useState([])
    console.log(chatData)
  
    const handleSend = () => {
      const Id = checkChat._id
      const Uid = sessionStorage.getItem('uId')
  
      socket.emit('toServer-sendMessage', { message, Id, Uid })
  
      setChatData((...preState) => preState.push({ message, check: false }))
    }
  
    useEffect(() => {
      if (!socket) return
  
      socket.on('toServer-sendMessage', ({ user }) => console.log(user))
    }, [socket])
  
    return (
      <Card sx={ChatContainerMainContainer}>
        <UserNavBar/>
        <Box sx={ChatComponentInnerBoxChat}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <OutlinedInput
              sx={ChatComponentInnerBoxBottom}
              id="outlined-adornment-amount"
              onChange={(event) => setMessage(event.target.value)}
              endAdornment={
                <InputAdornment position="start">
                  <IconButton aria-label="delete" onClick={handleSend}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box sx={ChatComponentInnerBoxTop}>
            <Box sx={ChatComponentTopInnerBoxLeft}>
              <Card sx={ChatComponentChatCard}>helo</Card>
            </Box>
            <Box sx={ChatComponentTopInnerBoxRight}>
              <Card sx={ChatComponentChatCard}>helo</Card>
            </Box>
            <Box sx={ChatComponentTopInnerBoxLeft}>
              <Card sx={ChatComponentChatCard}>helo</Card>
            </Box>
            <Box sx={ChatComponentTopInnerBoxRight}>
              <Card sx={ChatComponentChatCard}>helo</Card>
            </Box>
            <Box sx={ChatComponentTopInnerBoxLeft}>
              <Card sx={ChatComponentChatCard}>helo</Card>
            </Box>
            <Box sx={ChatComponentTopInnerBoxRight}>
              <Card sx={ChatComponentChatCard}>helo</Card>
            </Box>
            <Box sx={ChatComponentTopInnerBoxLeft}>
              <Card sx={ChatComponentChatCard}>helo</Card>
            </Box>
            <Box sx={ChatComponentTopInnerBoxRight}>
              <Card sx={ChatComponentChatCard}>helo</Card>
            </Box>
            <Box sx={ChatComponentTopInnerBoxLeft}>
              <Card sx={ChatComponentChatCard}>helo</Card>
            </Box>
            <Box sx={ChatComponentTopInnerBoxRight}>
              <Card sx={ChatComponentChatCard}>helo</Card>
            </Box>
            <Box sx={ChatComponentTopInnerBoxLeft}>
              <Card sx={ChatComponentChatCard}>
                <Typography>
                  hsafkjgdsakfdslukfgdsafdsfgsdadskfgdakjhgfidtsafuyeftgdsuijgfhjdsftuyewfgdsahjfgdsahjfgdsahjelo
                </Typography>
              </Card>
            </Box>
          </Box>
        </Box>
      </Card>
    )
  }
  
  export default ChatComponent