import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Memories from "../../assets/5.png";

import Tutorials from "../../assets/11.png";
import Fund from "../../assets/13.png";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'

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
          <hr />
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <hr />
          <div className="item">
            <img src={Groups} alt="" />
            <Link to={'../../Chat'}>

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
            <img src={Fund} alt="" />
            <span>Account</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Settings</span>
          </div>
          <div className="item">
            <LogoutIcon />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
