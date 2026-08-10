import "../Sidebar/Sidebar.css"
function SidebarSkeleton() {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Communities</h2>
            </div>

            <div className="sidebar-list">
                {[...Array(8)].map((_, index) => (
                    <div className="subreddit-card skeleton-card" key={index}>
                        <div className="skeleton-icon"></div>

                        <div className="subreddit-info">
                            <div className="skeleton-name"></div>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default SidebarSkeleton;