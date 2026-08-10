import "./Comment.css";

function Comment({comment}){
    return (
         <div className="comment">

            <div className="comment-header">

                <p className="comment-author">
                    u/{comment.data.author}
                </p>

                <p className="comment-score">
                    ⬆ {comment.data.score}
                </p>
            </div>

        <p className="comment-body">
                {comment.data.body}
        </p>
        </div>
    )
}

export default Comment