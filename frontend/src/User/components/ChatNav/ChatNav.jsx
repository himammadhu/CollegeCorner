import { Box, Card, IconButton, InputAdornment, OutlinedInput, Popover, Typography, useMediaQuery } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import {
  ChatListHeaderBox,
  ChatListHeaderMenuButton,
  ChatListHeaderSearchBox,
  ChatListHeaderSearchBoxResponsive,
  ChatListHeaderSearchTextField,
  ChatListHeaderSearchTextFieldResponsive,
  SearchTimeTransitionButton,

} from '../../UserStyle'
import ChatList from '../ChatList/ChatList'
// import SearchComponent from './SearchComponent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { setSocket } from '../../../Context/UseContext'
import SearchComponent from '../SearchComponent/SearchComponent'


const ChatNav = () => {
  const { socket } = useContext(setSocket)
  const Id = sessionStorage.getItem('uId')
  const matchesSmallScreen = useMediaQuery('(max-width: 768px)'); // Check if screen is small

  const [anchorEl, setAnchorEl] = useState(false)
  const [checkSearch, setCheckSearch] = useState(false)
  const [friends, setFriends] = useState([])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const SearchChangeHandleOpen = () => {
    setCheckSearch(true)
  }
  const SearchChangeHandleClose = () => {
    setCheckSearch(false)
  }

  const handleSearch = (e) => {
    let userName = e.target.value
    socket.emit('toServer-searchUser', { userName, Id })
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const iconButtonProps = {
    'aria-label': 'delete',
    onClick: checkSearch ? SearchChangeHandleClose : handleClick,
    sx: SearchTimeTransitionButton,
  }
  return (
    <>
      <Card sx={ChatListHeaderBox}>
        <Box sx={ChatListHeaderMenuButton}>
          {
            <IconButton {...iconButtonProps}>
              {checkSearch ? <ArrowBackIcon /> : <MenuIcon />}
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
        <Box sx={matchesSmallScreen ? ChatListHeaderSearchBoxResponsive : ChatListHeaderSearchBox}>

          <OutlinedInput
            style={matchesSmallScreen ? ChatListHeaderSearchTextFieldResponsive : ChatListHeaderSearchTextField}

            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">          <SearchIcon />
            </InputAdornment>}
            onChange={(e) => {
              SearchChangeHandleOpen()
              handleSearch(e)
            }}
          />

        </Box>
      </Card>
      {checkSearch ? <SearchComponent /> : <ChatList props={friends} />}

    </>
  )
}

export default ChatNav