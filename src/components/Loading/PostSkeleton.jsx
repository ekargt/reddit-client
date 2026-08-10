import "../Posts/PostCard.css";

function PostSkeleton() {
    return (
        <div className="post-list">
            {[...Array(4)].map((_, index) => (
                <div className="post-card skeleton-card" key={index}>
                    <div className="post-header">
                        <div className="skeleton-pill"></div>
                        <div className="skeleton-time"></div>
                    </div>

                    <div className="post-body">
                        <div className="post-text">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-title short"></div>

                            <div className="skeleton-line"></div>
                            <div className="skeleton-line"></div>
                            <div className="skeleton-line short"></div>

                            <div className="post-meta">
                                <div className="skeleton-author"></div>

                                <div className="post-stats">
                                    <div className="skeleton-stat"></div>
                                    <div className="skeleton-stat"></div>
                                </div>
                            </div>
                        </div>

                        <div className="skeleton-image"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostSkeleton;