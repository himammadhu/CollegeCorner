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
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";

const Navbar = ({ setCheck, check }) => {



  const [collegeData, setCollegeData] = useState([])
  const [logo, setLogo] = useState('')
  const Id = sessionStorage.getItem('cId')

  const fetchCollegeData = () => {
    axios.get(`http://localhost:5000/CollegeOne/${Id}`).then((response) => {
      console.log(response.data.CollegeData);
      setLogo(response.data.CollegeData.name.charAt(0))
      setCollegeData(response.data.CollegeData)
    })
  }

  useEffect(() => {
    fetchCollegeData()
  }, [])

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>CollegeCorner</span>
        </Link>
        <HomeOutlinedIcon />
        {
          check ? <LightModeIcon onClick={() => { setCheck(!check) }} /> : <DarkModeIcon onClick={() => { setCheck(!check) }} />
        }

        <GridViewOutlinedIcon />
        <div className="search-Box">

        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          {collegeData.photo ? (
            <img src={collegeData.photo} alt={collegeData.name} />
          ) : (
            <Avatar className="avatar">{
              collegeData &&
              logo}</Avatar>
          )}
          <span>{''}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
