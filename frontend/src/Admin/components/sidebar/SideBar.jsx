import { useContext } from 'react'
import "./SideBar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AndroidIcon from '@mui/icons-material/Android';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link } from "react-router-dom";
import { DarkModeContext } from '../../context/darkModeContext';
import { Box, Card } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ArchiveIcon from '@mui/icons-material/Archive';
import MailIcon from '@mui/icons-material/Mail';



const SidebarBox = {
  height: '100vh',
  backgroundColor: 'rgb(22, 106, 111)',
  overflowY: 'scroll',
  width:300,
  WebkitOverflowScrolling: 'touch', // For smoother scrolling on iOS devices

  /* Customize the scrollbar */
  scrollbarWidth: 'thin', // Firefox
  scrollbarColor: 'rgb(22, 106, 111) rgb(22, 106, 111)', // Firefox

  '&::-webkit-scrollbar': {
    width: '5px', // Set the width of the scrollbar
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'white', // Set the color of the scrollbar thumb
    borderRadius: '5px', // Set the border radius of the thumb
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgb(22, 106, 111)', // Set the color of the scrollbar track
  },

  /* Make the scrollbar visible when scrolling */
  '&:hover::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgb(22, 106, 111)', // Change the color on hover
  },
}

const SideBar = () => {
  const { dispatch } = useContext(DarkModeContext)
  return (
    <Card className='sidebar' sx={SidebarBox} >
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo"></span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Menu</p>
          <Box sx={{m:1}}>
            <Card sx={{ backgroundColor: '#66cacbbb' , px: 7, py: 2, '&:hover': { backgroundColor: '#66cacbbb' },display:'flex',alignItems:'center' }}>
              <DashboardIcon className='icons' />
              <span>Dashboard</span>
            </Card>
          </Box>
          <p className="title">User</p>
          <Link to="/admin/user" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className='icons' />
              <span>Admin</span>
            </li>
          </Link>
          <Link to="/admin/product" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className='icons' />
              <span>College List</span>
            </li>
          </Link>
          <li>
            <AddToPhotosIcon className='icons' />
            <span>Add College</span>
          </li>
          <li>
            <MailIcon className='icons' />
            <span>Message</span>
          </li>
        
          <li>
            <ArchiveIcon className='icons' />
            <span>Requests</span>
          </li>
          <li>
            <ReportGmailerrorredIcon className='icons' />
            <span>Complaints</span>
          </li>
          
          <p className="title">Useful</p>

          <li>
            <TrendingUpIcon className='icons' />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsActiveIcon className='icons' />
            <span>Notifications</span>
          </li>

          <p className="title">Services</p>
          <li>
            <AndroidIcon className='icons' />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyAltIcon className='icons' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className='icons' />
            <span>Settings</span>
          </li>

          <p className="title">User</p>
          <li>
            <PersonIcon className='icons' />
            <span>Profile</span>
          </li>
          <li>
            <LogoutIcon className='icons' />
            <span>LogOut</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })} >

        </div>
        <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}  >

        </div>
      </div>

    </Card>
  )
}

export default SideBar
