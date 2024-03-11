import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
// import Share from "../../components/share/Share"
import "./home.scss"
import Search from "../../components/Search/Search"
import axios from "axios"
import { useEffect, useState } from "react"

const Home = ({ userdata }) => {
  
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

      {/* <Share/> */}
      {userdata ? <Search userdata={userdata} /> : (<><Stories /> <Posts collegeFeedData={collegeFeedData} fetchCollegeFeed={fetchCollegeFeed} /></>)}

    </div>
  )
}

export default Home