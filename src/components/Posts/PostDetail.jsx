import { useSelector,useDispatch } from "react-redux" 
import { selectSelectedPost,selectComments } from "../../features/selectedPosts/selectedPostSlice"
import { findCommentsByPost } from "../../features/selectedPosts/selectedPostSlice";
import { useEffect } from "react";
import Comment from "../Comment/Comment"
import "./PostDetail.css";
import CommentSkeleton from "../Loading/CommentSkeleton";
import { selectCommentsLoading } from "../../features/selectedPosts/selectedPostSlice";
import { selectCommentsError } from "../../features/selectedPosts/selectedPostSlice";
import Error from "../Error/Error"
import { useNavigate } from "react-router-dom";

function PostDetail(){
    const navigate=useNavigate()
    const post=useSelector(selectSelectedPost)
    const comments=useSelector(selectComments)
    const dispatch=useDispatch()
    const loading = useSelector(selectCommentsLoading);
    const error=useSelector(selectCommentsError)

    useEffect(() => {
        if (post.data) {
            dispatch(findCommentsByPost(post.data.permalink));
        }
    }, [dispatch, post]);
    
    if (!post.data) {
    return (
        <Error
            message="This post is no longer available. Please click retry to return to the home page."
            onRetry={() => navigate("/")}
        />
    );
}

    if (error){
        return <Error message="Couldn't load the comments" onRetry={()=>dispatch(findCommentsByPost(post.data.permalink))}/>
    }

    const imageUrl = post.data.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&");

    return(
          <div className="post-detail">

            <div className="detail-card">
                <button className="close-button" onClick={() => {navigate(-1)}} aria-label="Close post">×</button>

                <h1 className="detail-title">{post.data.title}</h1>
                <div className="detail-meta">
                     <span>
                        u/{post.data.author}
                    </span>

                    <span>
                        ⬆ {post.data.score}
                    </span>

                    <span>
                        💬 {post.data.num_comments}
                    </span>
                </div>

                {post.data.selftext && ( <p className="detail-selftext"> {post.data.selftext} </p> )}

            {imageUrl && <img className="detail-image" src={imageUrl} alt={post.data.title}/>}
            </div>

            <div className="comments-section">
                <h2 className="comments-title">Comments</h2>
                {loading? <CommentSkeleton/> : comments.map(comment=>{
                    return <Comment key={comment.data.id} comment={comment}/>
                })}
            </div>
        </div>    
      
    )
}

export default PostDetail