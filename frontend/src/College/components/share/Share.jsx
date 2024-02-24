import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useState } from "react";
import axios from 'axios'
import { Button } from '@mui/material'

const Share = () => {

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState();

  const HandleSubmit = () => {
    const frm = new FormData();
    frm.append("CollegeFeedContent", image)
    frm.append("CollegeDiscription", description)
    frm.append("CollegeId", sessionStorage.getItem('cId'))


    axios.post('http://localhost:5000/CollegeFeed/', frm).then((response) => {
      console.log(response.data);
      setDescription('')
      setImage(null)
    })


  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={''}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${''}?`} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setImage(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
           
          </div>
          <div >
            {
              image &&
              <Button variant="outlined" sx={{px:5}} onClick={HandleSubmit}>Share</Button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
