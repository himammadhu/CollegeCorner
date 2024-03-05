import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import axios from 'axios'
import { FormControl, IconButton, InputAdornment,  OutlinedInput } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
const Navbar = ({ setCheck, check, setUserData }) => {


  const Id = sessionStorage.getItem('uId')

  const handleSearch = (event) => {
    const userName = event.target.value;

    if (userName === '') {
      setUserData(null)
    }
    else {


      axios
        .post("http://localhost:5000/SearchUser/", { userName, Id })
        .then((response) => {
          const data = response.data.userDataWithRooms
          setUserData(data)

        });

    }
  }

  return (
    <>
      <div className="navbar" >
        <div className="left">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>CoLLegECorNEr</span>
          </Link>
          <HomeOutlinedIcon />
          {
            check ? <LightModeIcon onClick={() => { setCheck(!check) }} /> : <DarkModeIcon onClick={() => { setCheck(!check) }} />
          }

          <GridViewOutlinedIcon />
          <div >

            <FormControl sx={{ m: 1, width: '100ch' }} variant="outlined">
              <OutlinedInput
              className="search"
                sx={{ borderRadius: 20 }}
                id="outlined-adornment-password"
                type={'text'}
                onChange={handleSearch}
                placeholder="Search..."
                size="small"
                startAdornment={<InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"

                    edge="end"
                  >
                    <SearchIcon className="logo" />
                  </IconButton>
                </InputAdornment>}


              />
            </FormControl>
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

    </>
  );
};

export default Navbar;
