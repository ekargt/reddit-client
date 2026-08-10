function CommentSkeleton() {
    return (
        <>
            {[...Array(5)].map((_, index) => (
                <div className="comment comment-skeleton" key={index}>
                    <div className="comment-header">
                        <div className="skeleton-author"></div>
                        <div className="skeleton-score"></div>
                    </div>

                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                </div>
            ))}
        </>
    );
}

export default CommentSkeleton;