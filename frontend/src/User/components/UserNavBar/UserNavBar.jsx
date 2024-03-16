import { Avatar, Box, Card, IconButton, Popover, Typography, useMediaQuery } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { NavbarInnerFirstBox, NavbarMainContainerBox, NavbarTypography, SearchTimeTransitionButton } from '../../UserStyle'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { setChat, setSocket } from '../../../Context/UseContext'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const UserNavBar = ({ UserDetails }) => {
    const matchesSmallScreen = useMediaQuery('(max-width: 968px)'); // Check if screen is small
    const { setCheckChat, checkChat } = useContext(setChat)
    const [typing, setTyping] = useState(false)
    const { socket } = useContext(setSocket)
    const { pathname } = useLocation(); // Use the useLocation hook and destructure pathname
    const isChatComponentPage = pathname.startsWith('/user/Chat/ChatComponent/');



    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const iconButtonProps = {
        'aria-label': 'delete',
        // onClick: checkSearch ? SearchChangeHandleClose : handleClick,
        sx: SearchTimeTransitionButton,
    }


    useEffect(() => {
        if (!socket) return

        socket.on('typing-started-from-server', () => setTyping(true));
        socket.on('typing-stopped-from-server', () => setTyping(false));

    }, [socket])
    return (
        <Card sx={NavbarMainContainerBox}>
            <Box sx={NavbarInnerFirstBox}>
                {
                    isChatComponentPage &&
                    <Link to={`/user/Chat`} onClick={() => setCheckChat(false)} style={{ textDecoration: 'none' }} >
                        <IconButton {...iconButtonProps}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                }

                <Avatar />
                <Typography
                    sx={NavbarTypography}>{UserDetails.name}
                  { typing && <Typography variant="caption" display="block" gutterBottom>
                        typing...
                    </Typography>}
                </Typography>

            </Box>
            <Box>
                <IconButton aria-label="delete" onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
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
            </Box>
        </Card>
    )
}

export default UserNavBar