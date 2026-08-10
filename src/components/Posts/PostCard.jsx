
import { useDispatch } from "react-redux"
import getTimeAgo from "../../utilities/getTimeAgo";
import { setSelectedPost } from "../../features/selectedPosts/selectedPostSlice";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";

function PostCard({post}){
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const imageUrl = post.data.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&");

    function handleClick(){
        dispatch(setSelectedPost(post))
        navigate(`/posts/${post.data.id}`)
    }

    return(
        <div className="post-card" onClick={handleClick}  data-testid="post-card">
             <div className="post-header">
                <span className="post-subreddit">r/{post.data.subreddit}</span>
                <span className="post-time">• {getTimeAgo(post.data.created_utc)}</span>
            </div>

            <div className="post-body">

                <div className="post-text">

            <h3 className="post-title">{post.data.title}</h3>
            {post.data.selftext && <p className="post-excerpt">{post.data.selftext}</p>}

                <div className="post-meta">
                    <div className="post-footer">
                        <span>u/{post.data.author}</span>
                    </div>
                    <div className="post-stats">
                        <span>⬆ {post.data.score}</span>
                        <span>💬 {post.data.num_comments}</span>
                    </div>
                </div>
                </div>
                {imageUrl && <img className="post-image" src={imageUrl} alt={post.data.title} onLoad={(e) => {
                    const img = e.target;

                    if (img.naturalHeight > img.naturalWidth) {
                        img.classList.add("portrait");
                    } 
                    else if (img.naturalWidth > img.naturalHeight) {
                        img.classList.add("landscape");
                    } 
                    else {
                        img.classList.add("square");
                    }}} />}
            </div>
        </div>  

    )
}

export default PostCard