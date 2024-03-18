import {
  Box,
  Card,
  CardMedia,
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
  ChatComponentChatCardResponsive,
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
import AttachFileIcon from '@mui/icons-material/AttachFile';
import styled from '@emotion/styled'



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


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
  const [AttachFile, setAttachFile] = useState(null)
  const [typingTimeOut, setTypingTimeOut] = useState(null)




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

  const handleSend = (e) => {
    e.preventDefault()
    const Id = UserDetails.chatListId
    const ToId = UserDetails._id

    socket.emit('toServer-sendMessage', { message, Id, Uid, ToId }, (response) => {
      console.log(response);
      setMessage('')
      setChatData(prevState => [...prevState, response]);
      setShouldScroll(true); // Trigger scrolling after updating chatData
      socket.emit("myFriendsFromClient")



    })

  }

  const handleInput = (e) => {
    setMessage(e.target.value)
    socket.emit('typing-started', { CId })

    if (typingTimeOut) clearTimeout(typingTimeOut)

    setTypingTimeOut(setTimeout(() => {
      socket.emit('typing-stopped', { CId })
    }, 500))
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



  useEffect(() => {
    if (!socket) return

    socket.on('showuploadFile', (response) => {
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

  const handleFile = (event) => {
    const file = event.target.files[0]
    setAttachFile(file)
    const ToId = UserDetails._id


    const randomString = Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().getTime();
    const fileName = `${randomString}_${timestamp}_${file.name}`;
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const data = reader.result
      socket.emit('uploadFile', { data, CId, Uid, ToId, fileName }, (response) => {
        setChatData(prevState => [...prevState, response]);

      })
    }
    console.log(file);
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
          <Box sx={matchesSmallScreen ? ChatComponentInnerBoxChatResponsive : ChatComponentInnerBoxChat} component={'form'} onSubmit={handleSend}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <OutlinedInput
                sx={ChatComponentInnerBoxBottom}
                id="outlined-adornment-amount"
                autoComplete='off'
                onChange={(event) => handleInput(event)}
                value={message}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton component={'label'}>
                      <AttachFileIcon />
                      <VisuallyHiddenInput type="file" onChange={handleFile} />
                    </IconButton>
                    <IconButton aria-label="delete" type='submit'>
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
                    {
                      chat.ChatContent ? <Card sx={ChatComponentChatCard}>{chat.ChatContent}</Card> :
                        <Card sx={matchesSmallScreen?ChatComponentChatCardResponsive:ChatComponentChatCard}>
                          <CardMedia image={chat.ChatFile} sx={{width:200,height:200}} />
                        </Card>


                    }
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