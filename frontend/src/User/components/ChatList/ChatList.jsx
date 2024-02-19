import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

import {
    ChatListBodyBox, ChatListBodySingleCard,
    ChatListBodySingleCardInnerBox,
    ChatListSingleCardInnerTypography,
} from '../../UserStyle'

const ChatList = () => {

    return (
        <Box sx={ChatListBodyBox}>

            <Box sx={ChatListBodySingleCard} >
                <Box sx={ChatListBodySingleCardInnerBox}>
                    <Avatar />
                    <Box sx={ChatListSingleCardInnerTypography}>
                        <Typography>Hello</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={ChatListBodySingleCard} >
                <Box sx={ChatListBodySingleCardInnerBox}>
                    <Avatar />
                    <Box sx={ChatListSingleCardInnerTypography}>
                        <Typography>Hello</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={ChatListBodySingleCard} >
                <Box sx={ChatListBodySingleCardInnerBox}>
                    <Avatar />
                    <Box sx={ChatListSingleCardInnerTypography}>
                        <Typography>Hello</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={ChatListBodySingleCard} >
                <Box sx={ChatListBodySingleCardInnerBox}>
                    <Avatar />
                    <Box sx={ChatListSingleCardInnerTypography}>
                        <Typography>Hello</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={ChatListBodySingleCard} >
                <Box sx={ChatListBodySingleCardInnerBox}>
                    <Avatar />
                    <Box sx={ChatListSingleCardInnerTypography}>
                        <Typography>Hello</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatList