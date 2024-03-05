// import Stories from "../../components/stories/Stories"
import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import axios from "axios";

const Home = () => {

  
  const [collegeFeedData,setCollegeFeedData] = useState([])
  // const Id = sessionStorage.getItem('cId')

  const fetchCollegeFeed = () => {
    axios.get( `http://localhost:5000/CollegeFeed`).then((response) => {
      console.log(response.data.CollegeFeedlist);
      setCollegeFeedData(response.data.CollegeFeedlist)
    })
  }
  

  useEffect(() => {
    fetchCollegeFeed()
  }, [])
  return (
    <div className="home">
      {/* <Stories/> */}
      <Share fetchCollegeFeed={fetchCollegeFeed}/>
      <Posts collegeFeedData={collegeFeedData} fetchCollegeFeed={fetchCollegeFeed}/>
    </div>
  )
}

export default Home