import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
// import Share from "../../components/share/Share"
import "./home.scss"
import Search from "../../components/Search/Search"

const Home = ({ userdata }) => {
  return (
    <div className="home">

      {/* <Share/> */}
      {userdata ? <Search userdata={userdata} /> : (<><Stories /> <Posts /></>)}

    </div>
  )
}

export default Home