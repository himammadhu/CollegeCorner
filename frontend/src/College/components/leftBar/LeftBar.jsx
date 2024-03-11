import "./leftBar.scss";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DraftsIcon from '@mui/icons-material/Drafts';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import Person2Icon from '@mui/icons-material/Person2';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { Card } from "@mui/material";


const LeftBar = () => {


  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={''}
              alt=""
            />
            <span>{''}</span>
          </div>
          <Link to={'/College/AddUser'}>
            <Card sx={{ backgroundColor: 'rgb(214, 250, 249)', px: 7, py: 2, '&:hover': { backgroundColor: '#66cacbbb' }, display: 'flex', alignItems: 'center' }}>
                <div className="item">
                <PersonAddAltIcon className='icons' />
                <span>Add User</span>

                </div>
            </Card>
          </Link>
          
          <Card sx={{ backgroundColor: 'rgb(214, 250, 249)', px: 7, py: 2, '&:hover': { backgroundColor: '#66cacbbb' }, display: 'flex', alignItems: 'center' }}>

          <div className="item">
            <GroupAddIcon className='icons' />
            <span>Add Groups</span>
          </div>
          </Card>
          <Card sx={{ backgroundColor: 'rgb(214, 250, 249)', px: 7, py: 2, '&:hover': { backgroundColor: '#66cacbbb' }, display: 'flex', alignItems: 'center' }}>

          <div className="item">
            <DraftsIcon className='icons' />
            <span>Complaints</span>
          </div>
          </Card>
          <Card sx={{ backgroundColor: 'rgb(214, 250, 249)', px: 7, py: 2, '&:hover': { backgroundColor: '#66cacbbb' }, display: 'flex', alignItems: 'center' }}>

          <div className="item">
            <TimerOutlinedIcon className='icons' />
            <span>Memories</span>
          </div>
          </Card>
          <Card sx={{ backgroundColor: 'rgb(214, 250, 249)', px: 7, py: 2, '&:hover': { backgroundColor: '#66cacbbb' }, display: 'flex', alignItems: 'center' }}>

          <div className="item">
            <LocalPostOfficeOutlinedIcon className='icons' />
            <span>Messages</span>
          </div>
          </Card>
        </div>


        <hr />
        <div className="items">
        <Person2Icon className='icons' />
          <span>Account</span>
        </div>
        <hr/>
        <div className="items">
        <SettingsIcon className='icons' />
          <span>Settings</span>
        </div>
        <hr/>
        <div className="items">
        <LogoutIcon className='icons' /> 
          <span>Logout</span>
        </div>
        <hr/>


      </div>
    </div>
  );
};

export default LeftBar;
