import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";
import axios from "axios";

const Posts = () => {

  const [collegeFeedData,setCollegeFeedData] = useState([])

  const fetchCollegeFeed = () => {
    axios.get('http://localhost:5000/CollegeFeed').then((response) => {
      console.log(response.data.CollegeFeedlist);
      setCollegeFeedData(response.data.CollegeFeedlist)
    })
  }

  useEffect(() => {
    fetchCollegeFeed()
  }, [])


  return (
    <div className="posts">
      {collegeFeedData.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>);
};

export default Posts;
