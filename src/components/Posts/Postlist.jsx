import PostCard from "./PostCard";
import {useSelector} from "react-redux"
import { selectPosts } from "../../features/search/searchSlice"
import "./Postlist.css"

function Postlist(){
    const posts=useSelector(selectPosts)

    if (posts.length === 0) {
        return <p className="no-posts">No posts loaded yet...</p>;
    }
    return(
        <div className="post-list">
        {posts.map(post=>{
            return <PostCard key={post.data.id} post={post}/>
        })}
        </div>
    )
}

export default Postlist