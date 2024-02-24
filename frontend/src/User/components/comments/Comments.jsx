import { useEffect, useState } from "react";
import "./comments.scss";
import axios from "axios";

const Comments = ({props}) => {

  
  const [collegeCommentData,setCollegeCommentData] = useState([])
  const [comment, setComment] = useState('')

  const fetchCollegeFeedComment = () => {
    axios.get(`http://localhost:5000/CollegeComment/${props}`).then((response) => {
      console.log(response.data.Commentlist);
      setCollegeCommentData(response.data.Commentlist)
    })
  }

  useEffect(() => {
    fetchCollegeFeedComment()
  }, [])
 
  return (
    <div className="comments">
    
      {collegeCommentData.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
        <div className="write">
        <img src={''} alt="" />
        <input type="text" placeholder="write a comment" onChange={(event) => setComment(event.target.value)} />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Comments;
