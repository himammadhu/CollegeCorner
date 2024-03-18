export const UserMainAppContainer = {
  display: 'flex',
  backgroundColor: 'lightblue',
}

export const ChatListMainContainer = {
  height: '80vh',
  width: '25vw',
  m: 1,


}

export const ChatListHeaderBoxResponsive = {
  height: '80vh',
  width: '100vw',
  m: 1,
};




export const ChatListHeaderBox = {
  height: '10vh',
  p: 2,
  mb: 2,
  display: 'flex',
}



export const ChatListBodyBox = {
  height: '70vh',
  overflowY: 'scroll',
  WebkitOverflowScrolling: 'touch', // For smoother scrolling on iOS devices

  /* Customize the scrollbar */
  scrollbarWidth: 'thin', // Firefox
  scrollbarColor: '#888 #f1f1f1', // Firefox

  '&::-webkit-scrollbar': {
    width: '5px', // Set the width of the scrollbar
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'white', // Set the color of the scrollbar thumb
    borderRadius: '5px', // Set the border radius of the thumb
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1', // Set the color of the scrollbar track
  },

  /* Make the scrollbar visible when scrolling */
  '&:hover::-webkit-scrollbar-thumb': {
    backgroundColor: '#cfbbbb', // Change the color on hover
  },

  // Hide the default scrollbar
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}
export const ChatListBodySingleCard = {
  m: 1,
  height: '10vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 6,
  px: 2,
  transition: 'background-color 0.4s ease', // Add a smooth transition effect

  '&:hover': {
    backgroundColor: '#e6d4d4', // Change the background color on hover
    borderRadius: 6,
  },
}

export const ChatListBodySingleCardInnerBox = {
  display: 'flex',
  alignItems: 'center'
}

export const ChatListSingleCardInnerTypography = {
  ml: 3,
}

export const ChatListHeaderSearchBox = {
  height: 31,
  mt: 2.5,
  mx: 3,
  width: 250,
  display: 'flex',
  justifyContent: 'center',
}

export const ChatListHeaderSearchBoxResponsive = {
  height: 31,
  mt: 2.5,
  mx: 3,
  width: '75vw',
  display: 'flex',
  justifyContent: 'center',
}

export const ChatListHeaderMenuButton = {
  mt: 2.5,
}

export const ChatListHeaderSearchTextField = {
  width: 250,
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '20px',
  border: '1px solid',
  height: 35,
  paddingLeft: '10px',
}

export const ChatListHeaderSearchTextFieldResponsive = {
  width: '75vw',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '20px',
  border: '1px solid',
  height: 35,
  paddingLeft: '10px',
}

export const ChatContainerMainContainer = {
  height: '87vh',
  width: '98vw',
  m: 1,
}

export const ChatContainerMainContainerResponsive = {
  height: '87vh',
  width: '97vw',
  m: 1,
}

export const NavbarMainContainerBox = {
  height: 70,
  backgroundColor: 'lightblue',
  m: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: 3,
}

export const NavbarTypography = {
  ml: 2,
}

export const NavbarInnerFirstBox = {
  display: 'flex',
  alignItems: 'center',
}

export const ChatComponentInnerBoxChat = {
  display: 'flex',
  flexDirection: 'column-reverse',
  px: 25,
  height: '70vh',
}
export const ChatComponentInnerBoxChatResponsive = {
  display: 'flex',
  flexDirection: 'column-reverse',
  px: 10,
  height: '70vh',
}

export const ChatComponentInnerBoxTop = {
  m: 2,
  height: '70vh',
  overflowY: 'scroll',

  WebkitOverflowScrolling: 'touch', // For smoother scrolling on iOS devices

  /* Customize the scrollbar */
  scrollbarWidth: 'thin', // Firefox
  scrollbarColor: '#888 #f1f1f1', // Firefox

  '&::-webkit-scrollbar': {
    width: '5px', // Set the width of the scrollbar
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'white', // Set the color of the scrollbar thumb
    borderRadius: '5px', // Set the border radius of the thumb
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1', // Set the color of the scrollbar track
  },

  /* Make the scrollbar visible when scrolling */
  '&:hover::-webkit-scrollbar-thumb': {
    backgroundColor: '#cfbbbb', // Change the color on hover
  },
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}

export const ChatComponentInnerBoxBottom = {
  borderRadius: 30,
}

export const ChatComponentTopInnerBoxLeft = {
  display: 'flex',
  justifyContent: 'left',
}

export const ChatComponentTopInnerBoxRight = {
  display: 'flex',
  justifyContent: 'right',
}

export const ChatComponentChatCard = {

  maxWidth: '15vw', // Set a maximum width
  p: 2,
  backgroundColor: 'lightblue',
  m: 1,

  borderRadius: '15px',
  overflowWrap: 'break-word', // or use 'word-wrap: break-word' for older browsers

}

export const ChatComponentChatCardResponsive = {

  maxWidth: '30vw', // Set a maximum width
  p: 2,
  backgroundColor: 'lightblue',
  m: 1,

  borderRadius: '15px',
  overflowWrap: 'break-word', // or use 'word-wrap: break-word' for older browsers

}




export const SearchTimeTransitionButton = {
  transition: '0.6s ease', // Add a smooth transition effect
  transitionDelay: '0.2s', // Add a delay of 0.2 seconds (you can adjust this value)

}