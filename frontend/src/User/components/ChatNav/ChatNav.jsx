import { Box, Card, IconButton, Popover, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import {
  ChatListHeaderBox,
  ChatListHeaderMenuButton,
  ChatListHeaderSearchBox,
  ChatListHeaderSearchTextField,
  SearchTimeTransitionButton,
} from '../../UserStyle'
import ChatList from '../ChatList/ChatList'
// import SearchComponent from './SearchComponent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const ChatNav = () => {

  const [anchorEl, setAnchorEl] = useState(false)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const iconButtonProps = {
    'aria-label': 'delete',
    sx: SearchTimeTransitionButton,
  }


  return (
    <>
      <Card sx={ChatListHeaderBox}>
        <Box sx={ChatListHeaderMenuButton}>
          {
            <IconButton {...iconButtonProps}>
              {true ? <ArrowBackIcon /> : <MenuIcon />}
            </IconButton>
          }
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>
        <Box sx={ChatListHeaderSearchBox}>
          <SearchIcon sx={{ position: 'absolute', left: 95, top: 53 }} />
          <input
            style={ChatListHeaderSearchTextField}
            id="standard-basic"
           
          />
        </Box>
      </Card>
      <ChatList  />
      {/* <SearchComponent /> */}
    </>
  )
}

export default ChatNav