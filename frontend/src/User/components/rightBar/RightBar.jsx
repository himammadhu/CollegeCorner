import "./rightBar.scss";
import { setSocket } from '../../../Context/UseContext'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "@mui/material";
const RightBar = () => {
  const { socket } = useContext(setSocket)
  const Id = sessionStorage.getItem('uId')
  const [Followers, setFollowers] = useState(null)
  const [Friends, setFriends] = useState(null)
  const fetchFollowRequest = () => {
    axios.get(`http://localhost:5000/ChatList/${Id}`).then((response) => {
      console.log(response.data.ChatListlist);
      setFollowers(response.data.ChatListlist)

    })
  }


  const fetchFollowers = () => {
    axios.get(`http://localhost:5000/ChatListFriends/${Id}`).then((response) => {
      console.log(response.data.ChatListlist);
      setFriends(response.data.ChatListlist)

    })
  }



  const handleAddRequest = (Id) => {

    axios.put(`http://localhost:5000/ChatListAccept/${Id}`).then((response) => {
      console.log(response.data.message);
      fetchFollowRequest()
      fetchFollowers()

    })
  }

  const handleRemoveRequest = (Id) => {

    axios.put(`http://localhost:5000/ChatListReject/${Id}`).then((response) => {
      console.log(response.data.message);
      fetchFollowRequest()
      fetchFollowers()

    })
  }

  useEffect(() => {
    fetchFollowRequest()
    fetchFollowers()
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('fromServerFollowRequest', () =>
      fetchFollowRequest()
    )
  }, [socket])

  return (
    <div className="rightBar">
      <div className="container">
        <Card className="item" sx={{ maxHeight: 400, overflowY: 'hidden' }}>
          <span>New Followers</span>
          {
            Followers && Followers.map((userData, key) => (
              <div className="user" key={key}>
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <span>{userData.ChatListUserOne.name}</span>
                </div>
                <div className="buttons">
                  <Button variant="contained" sx={{ fontSize: '10px', px: 3 }} onClick={() => handleAddRequest(userData._id)} >follow</Button>
                  <Button variant="contained" sx={{ fontSize: '10px' }} onClick={() => handleRemoveRequest(userData._id)}>dismiss</Button>
                </div>
              </div>
            ))
          }


        </Card>
        <Card className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </Card>
        <Card className="item">
          <span>Online Friends</span>
          {
            Friends && Friends.map((user) => (
              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="online" />
                  <span>{user.name}</span>
                </div>
              </div>
            ))
          }


        </Card>
      </div>
    </div>
  );
};

export default RightBar;
