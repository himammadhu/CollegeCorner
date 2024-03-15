import { Avatar, Box, Card, IconButton, Popover, Typography, useMediaQuery } from '@mui/material'
import React, { useContext, useState } from 'react'
import { NavbarInnerFirstBox, NavbarMainContainerBox, NavbarTypography, SearchTimeTransitionButton } from '../../UserStyle'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { setChat } from '../../../Context/UseContext'
import { Link } from 'react-router-dom';

const UserNavBar = ({ UserDetails }) => {
    const matchesSmallScreen = useMediaQuery('(max-width: 968px)'); // Check if screen is small
    const { setCheckChat, checkChat } = useContext(setChat)



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
    return (
        <Card sx={NavbarMainContainerBox}>
            <Box sx={NavbarInnerFirstBox}>
                {
                    checkChat &&
                    <Link to={`/Chat`} onClick={() => setCheckChat(false)} style={{ textDecoration: 'none' }} >

                        <IconButton {...iconButtonProps}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                }

                <Avatar />
                <Typography sx={NavbarTypography}>{UserDetails.name}</Typography>
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