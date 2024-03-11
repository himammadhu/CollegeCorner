import { useEffect, useState } from "react";
import "./comments.scss";
import axios from "axios";
import { Avatar, FormControl, IconButton,  OutlinedInput } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
const Comments = ({ postId , CommentDetails}) => {
  console.log(postId);
  const Uid = sessionStorage.getItem('uId')

  const [comment, setComment] = useState('')
  const [commentData, setCommentData] = useState([])

  const handleComment = () => {
    const data = {
      Content: comment,
      UserId: Uid,
      CollegefeedId: postId
    }
    axios.post(`http://localhost:5000/Comment`, data).then((response) => {
      console.log(response.data.Commentlist);
      fetchComment()
      setComment('')
      CommentDetails(postId)
    })
  }

  const fetchComment = () => {
    axios.get(`http://localhost:5000/CollegeComment/${postId}`).then((response) => {
      console.log(response.data.Commentlist);
      setCommentData(response.data.Commentlist)
    })
  }

  useEffect(() => {
    fetchComment()
  }, [])


  return (
    <div className="comments">

      {commentData.map((comment) => (
        <div className="comment">
          <Avatar src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.UserId.name }</span>
            <p>{comment.Content}</p>
          </div>
          {/* <span className="date">1 hour ago</span> */}
        </div>
      ))}
      <div >
        <FormControl fullWidth sx={{ m: 1 }}>
          <OutlinedInput
            sx={{ borderRadius: 5 }}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            endAdornment={<IconButton onClick={handleComment} >
              <SendIcon />
            </IconButton>}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default Comments;
