import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useState } from "react";
import axios from 'axios'

const Share = () => {

  const [image, setImage] = useState();
  const [description, setDescription] = useState();

  const HandleSubmit = () => {
    const frm = new FormData();
    frm.append("Image",image)
    frm.append("UserFeedDescription",description)


    axios.post('http://localhost:5000/UserFeed/', frm).then((response) => {
            console.log(response.data);
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
            <input type="file" id="file" style={{display:"none"}} onChange={ (e) => setImage(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={HandleSubmit}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
