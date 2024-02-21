import { Avatar, Box, Card, IconButton, Popover, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavbarInnerFirstBox, NavbarMainContainerBox, NavbarTypography } from '../../UserStyle'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UserNavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Card sx={NavbarMainContainerBox}>
            <Box sx={NavbarInnerFirstBox}>
                <Avatar />
                <Typography sx={NavbarTypography}>Hello</Typography>
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