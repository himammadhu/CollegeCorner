import Post from "../post/Post";
import "./posts.scss";

const Posts = ({collegeFeedData,fetchCollegeFeed}) => {



  return (
    <div className="posts">

      {
      collegeFeedData.map((post,key) => (
        <Post post={post} key={key} fetchCollegeFeed={fetchCollegeFeed} />
      ))}
    </div>);
};

export default Posts;
