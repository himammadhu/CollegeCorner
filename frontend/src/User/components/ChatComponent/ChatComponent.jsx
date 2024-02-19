import {
    Box,
    Card,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Typography,
  } from '@mui/material'
  import React, { useEffect, useState } from 'react'
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
  
  const ChatComponent = ({ props }) => {
  
    const [message, setMessage] = useState('')
    const [chatData, setChatData] = useState([])
    console.log(chatData)
  
    const handleSend = () => {
    
    }
  
    useEffect(() => {
     
  
    }, [])
  
    return (
      <Card sx={ChatContainerMainContainer}>
        {/* <Navbar props={props.friend ? props.friend : props} /> */}
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