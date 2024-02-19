import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Navbar = ({setCheck,check}) => {

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>CoLLeGeCorNEr</span>
        </Link>
        <HomeOutlinedIcon />
        {
          check ? <LightModeIcon onClick={() => {setCheck(!check)}}/>:<DarkModeIcon onClick={() => {setCheck(!check)}}/>
        }
       
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            src={''}
            alt=""
          />
          <span>{''}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
