import { useEffect, useState } from "react";
import "./comments.scss";
import axios from "axios";

const Comments = ({postId}) => {
  console.log(postId);
  const Uid = sessionStorage.getItem('cId')

  const [comment, setComment] = useState('')
  const [commentData,setCommentData] = useState([])

  const handleComment = () => {
    const data = {
      Content:comment,
      UserId:Uid,
      CollegefeedId:postId
    }
    axios.post(`http://localhost:5000/Comment`,data).then((response) => {
      console.log(response.data.Commentlist);
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
  },[])


  return (
    <div className="comments">
      
      {commentData.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{}</span>
            <p>{comment.Content}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
      <div className="write">
        <img src={''} alt="" />
        <input type="text" placeholder="write a comment" value={comment} onChange={(event) => setComment(event.target.value)} />
        <button onClick={handleComment}>Send</button>
      </div>
    </div>
  );
};

export default Comments;
