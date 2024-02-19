import { useContext } from 'react'
import "./SideBar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
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



const SidebarBox = {
  height: '100vh',
  overflowY: 'scroll',
  width:300,
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
            <Card sx={{ px: 7, py: 2, '&:hover': { backgroundColor: '#66cacbbb' },display:'flex',alignItems:'center' }}>
              <DashboardIcon className='icons' />
              <span>Dashboard</span>
            </Card>
          </Box>
          <p className="title">List</p>
          <Link to="/admin/user" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className='icons' />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/product" style={{ textDecoration: "none" }}>
            <li>
              <ProductionQuantityLimitsIcon className='icons' />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <AddBusinessIcon className='icons' />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className='icons' />
            <span>Delivery</span>
          </li>
        
          <li>
            <AddBusinessIcon className='icons' />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className='icons' />
            <span>Delivery</span>
          </li>
          <li>
            <LocalShippingIcon className='icons' />
            <span>Delivery</span>
          </li>
          <li>
            <LocalShippingIcon className='icons' />
            <span>Delivery</span>
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
