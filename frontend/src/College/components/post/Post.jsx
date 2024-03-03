import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Card, Popper } from "@mui/material";
import axios from "axios";

const Post = ({ post, fetchCollegeFeed }) => {
  const Id = sessionStorage.getItem('cId')
  const [commentOpen, setCommentOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;


  const deleteCollegeFeed = (pId) => {
    axios.delete(`http://localhost:5000/CollegeFeed/${pId}`).then((response) => {
      console.log(response.data.message);
      fetchCollegeFeed()
    })
  }


  const AddLike = (fId) => {
    const data = {
      CollegefeedId: fId,
      UserId: Id
    }
    axios.post(`http://localhost:5000/LikeCollegeFeed`, data).then(() => {
      LikeDetails(post._id)


    })
  }
  const RemoveLike = (fId) => {
    axios.delete(`http://localhost:5000/Like/${Id}/${fId}`).then(() => {
      LikeDetails(post._id)

      
    })
  }


  const LikeDetails = (fId) => {
    axios.get(`http://localhost:5000/LikeDetails/${Id}/${fId}`).then((response) => {
      setLiked(response.data.like)
      setCount(response.data.count)
    })
  }

  useEffect(() => {
    LikeDetails(post._id)
  }, [])
  return (
    <>

      <div className="post">
        <div className="container">
          <div className="user">
            <div className="userInfo">
              {post.CollegeId.photo ? (
                <img src={post.CollegeId.photo} alt={post.CollegeId.name} />
              ) : (
                <Avatar className="avatar">{
                  post &&
                  post.CollegeId.name.charAt(0)}</Avatar>
              )}
              <div className="details">
                <Link
                  to={`/profile/${post.userId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="name">{post.name}</span>
                </Link>
                <span className="date">{post.timeDifference} ago</span>
              </div>
            </div>
            {
              Id === post.CollegeId._id && <>
                <MoreHorizIcon aria-describedby={id} type="button" onClick={handleClick} />
                <Popper id={id} open={open} anchorEl={anchorEl}>
                  <Card sx={{ px: 2, py: 2 }}><DeleteIcon onClick={() => deleteCollegeFeed(post._id)} /></Card>
                </Popper>
              </>
            }

          </div>
          <div className="content">
            <p>{post.CollegeDiscription}</p>
            <img src={post.CollegeFeedContent} alt="" />
          </div>
          <div className="info">
            <div className="item">
              {liked ? <FavoriteOutlinedIcon color="error" onClick={() => RemoveLike(post._id)} /> : <FavoriteBorderOutlinedIcon onClick={() => AddLike(post._id)} />}
             {count} Like
            </div>
            <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
              <TextsmsOutlinedIcon />
              12 Comments
            </div>
            <div className="item">
              <ShareOutlinedIcon />
              Share
            </div>
          </div>
          {commentOpen && <Comments postId={post._id} />}
        </div>
      </div>
    </>
  );
};

export default Post;
