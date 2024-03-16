import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Memories from "../../assets/5.png";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom'

const LeftBar = () => {


  return (
    <div className="leftBarUser">
      <div className="container">
        <div className="menu">


          <div className="item">
            <img src={Friends} alt="" />
            <span>Followers</span>
          </div>
          <hr />
          <div className="item">
            <img src={Groups} alt="" />
            <Link to={'/user/Chat/'}>

              <span>Chats</span>
            </Link>
          </div>
          <hr />


          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>

        <hr />

        <div className="menu">
          <span>User</span>
          <div className="item">
            <AccountCircleIcon />
            <Link to={'../Profile'}>
              <span>Account</span>
            </Link>
          </div>
          <br />
          <div className="item">
            <SettingsIcon />
            <Link to={'/user/Settings'}>
              <span>Settings</span>
            </Link>
          </div>
          <br />
          <div className="item">
            <LogoutIcon />
            <span>Logout</span>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
