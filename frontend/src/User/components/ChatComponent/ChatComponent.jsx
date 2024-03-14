import {
  Box,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { setChat, setSocket } from '../../../Context/UseContext'
import axios from 'axios'


const ChatComponent = () => {
  const { checkChat } = useContext(setChat)
  const chatContainerRef = useRef(null);

  const { socket } = useContext(setSocket)
  const Id = checkChat.chatListId
  const ToId = checkChat._id
  const Uid = sessionStorage.getItem('uId')
  const [shouldScroll, setShouldScroll] = useState(false); // Add state to manage scrolling


  const [message, setMessage] = useState('')
  const [chatData, setChatData] = useState([])


  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
      setShouldScroll(false); // Reset the state after scrolling
    }
  }, [shouldScroll]);

  const handleSend = () => {
    socket.emit('toServer-sendMessage', { message, Id, Uid, ToId }, (response) => {
      console.log(response);
      setMessage('')
      setChatData(prevState => [...prevState, response]);
      setShouldScroll(true); // Trigger scrolling after updating chatData


    })

  }

  
  useEffect(() => {
    if (!socket) return

    socket.emit("createRoomFromClient", { checkChat })

  }, [socket])

  useEffect(() => {
    if (!socket) return


    socket.on('toServer-sendMessage', (response) => {
      setChatData(prevState => [...prevState, response]);

    })
  }, [socket])

  const fetchChat = () => {
    axios.get(`http://localhost:5000/Chat/${Id}`).then((response) => {
      console.log(response.data);
      setChatData(response.data)
      setShouldScroll(true); // Trigger scrolling after updating chatData


    })
  }


  useEffect(() => {
    fetchChat()
  }, [checkChat])

  return (
    <Card sx={ChatContainerMainContainer} >
      <UserNavBar />
      <Box sx={ChatComponentInnerBoxChat}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <OutlinedInput
            sx={ChatComponentInnerBoxBottom}
            id="outlined-adornment-amount"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            endAdornment={
              <InputAdornment position="start">
                <IconButton aria-label="delete" onClick={handleSend}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box sx={ChatComponentInnerBoxTop} ref={chatContainerRef}>


          {
            chatData.map((chat, key) => (
              <Box sx={chat.ChatFromId === Uid ? ChatComponentTopInnerBoxRight : ChatComponentTopInnerBoxLeft}>
                <Card sx={ChatComponentChatCard}>{chat.ChatContent}</Card>
              </Box>
            ))
          }



        </Box>
      </Box>
    </Card>
  )
}

export default ChatComponent