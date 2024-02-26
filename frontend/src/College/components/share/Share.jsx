import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Avatar, Button } from '@mui/material'

const Share = ({fetchCollegeFeed}) => {

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState();
    
  const [collegeData, setCollegeData] = useState([])
  const [logo, setLogo] = useState('')
  const Id = sessionStorage.getItem('cId')

  const HandleSubmit = () => {
    const frm = new FormData();
    frm.append("CollegeFeedContent", image)
    frm.append("CollegeDiscription", description)
    frm.append("CollegeId", sessionStorage.getItem('cId'))


    axios.post('http://localhost:5000/CollegeFeed/', frm).then((response) => {
      console.log(response.data);
      setDescription('')
      setImage(null)
      fetchCollegeFeed()
    })


  }




  const fetchCollegeData = () => {
    axios.get(`http://localhost:5000/CollegeOne/${Id}`).then((response) => {
      setLogo(response.data.CollegeData.name.charAt(0))
      setCollegeData(response.data.CollegeData)
    })
  }

  useEffect(() => {
    fetchCollegeData()
  }, [])

  return (
    <div className="share">
      <div className="container">
        <div className="top">
        {collegeData.photo ? (
            <img src={collegeData.photo} alt={collegeData.name} />
          ) : (
            <Avatar className="avatar">{
              collegeData &&
              logo}</Avatar>
          )}
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
