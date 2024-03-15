import {
  Box,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  ChatComponentChatCard,
  ChatComponentInnerBoxBottom,
  ChatComponentInnerBoxChat,
  ChatComponentInnerBoxChatResponsive,
  ChatComponentInnerBoxTop,
  ChatComponentTopInnerBoxLeft,
  ChatComponentTopInnerBoxRight,
  ChatContainerMainContainer,
  ChatContainerMainContainerResponsive,
} from '../../UserStyle'
//   import Navbar from './Navbar'
import SendIcon from '@mui/icons-material/Send'
import UserNavBar from '../UserNavBar/UserNavBar'
import { setChat, setSocket } from '../../../Context/UseContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const ChatComponent = () => {
  const matchesSmallScreen = useMediaQuery('(max-width: 968px)'); // Check if screen is small
  const { CId } = useParams()

  const chatContainerRef = useRef(null);

  const { socket } = useContext(setSocket)

  const Uid = sessionStorage.getItem('uId')
  const [shouldScroll, setShouldScroll] = useState(false); // Add state to manage scrolling


  const [message, setMessage] = useState('')
  const [UserDetails, setUserDetails] = useState(null)
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
    const Id = UserDetails.chatListId
    const ToId = UserDetails._id
    socket.emit('toServer-sendMessage', { message, Id, Uid, ToId }, (response) => {
      console.log(response);
      setMessage('')
      setChatData(prevState => [...prevState, response]);
      setShouldScroll(true); // Trigger scrolling after updating chatData


    })

  }


  useEffect(() => {
    if (!socket) return

    socket.emit("createRoomFromClient", { CId })

  }, [socket])

  useEffect(() => {
    if (!socket) return


    socket.on('toServer-sendMessage', (response) => {
      setChatData(prevState => [...prevState, response]);

    })
  }, [socket])

  const fetchChat = () => {
    axios.get(`http://localhost:5000/Chat/${CId}`).then((response) => {
      setChatData(response.data)
      setShouldScroll(true); // Trigger scrolling after updating chatData


    })
  }

  const fetchUser = () => {
    axios.get(`http://localhost:5000/singleFriendUser/${CId}/${Uid}`).then((response) => {
      setUserDetails(response.data)



    })
  }


  useEffect(() => {
    fetchChat()
    fetchUser()
  }, [CId])

  return (
    <>
      {UserDetails &&
        (<Card sx={matchesSmallScreen ? ChatContainerMainContainerResponsive : ChatContainerMainContainer} >
          <UserNavBar UserDetails={UserDetails} />
          <Box sx={matchesSmallScreen ? ChatComponentInnerBoxChatResponsive : ChatComponentInnerBoxChat}>
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
                  <Box sx={chat.ChatFromId === Uid ? ChatComponentTopInnerBoxRight : ChatComponentTopInnerBoxLeft} key={key}>
                    <Card sx={ChatComponentChatCard}>{chat.ChatContent}</Card>
                  </Box>
                ))
              }



            </Box>
          </Box>
        </Card>)

      }

    </>

  )
}

export default ChatComponent