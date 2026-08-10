import { searchPostsBySubreddit } from "../../features/search/searchSlice";
import { useSelector,useDispatch } from "react-redux";
import { selectSubreddits } from "../../features/subreddits/subredditsSlice";
import { useState } from "react";
import "./Sidebar.css"
import redditLogo from "../../assets/Reddit-Logomark-Color-Logo.wine.svg"
import SidebarSkeleton from "../Loading/SidebarSkeleton";
import { selectSubredditLoading } from "../../features/subreddits/subredditsSlice";
import { findPopularSubreddits } from "../../features/subreddits/subredditsSlice";

function Sidebar(){
    const [selectedSubreddit, setSelectedSubreddit] = useState("");
    const subreddits=useSelector(selectSubreddits)
    const dispatch=useDispatch()
    const loading=useSelector(selectSubredditLoading)

    if (loading) {
    return <SidebarSkeleton />;}
    return(
         <aside className="sidebar">

            <div className="sidebar-header">
                <h2>Communities</h2>
            </div>

            <div className="sidebar-list">
                {subreddits.map(subreddit=>{
                    const icon = subreddit.data.icon_img;
                    return <button key={subreddit.data.display_name}  className={`subreddit-card ${
        selectedSubreddit === subreddit.data.display_name ? "active" : ""
    }`} onClick={()=>{dispatch(searchPostsBySubreddit(subreddit.data.display_name)); setSelectedSubreddit(subreddit.data.display_name)}}>
                            {icon ? <img className="subreddit-icon" src={icon} /> : <img className="subreddit-icon" src={redditLogo} />}
                            <div className="subreddit-info">
                                <span className="subreddit-name">
                                    r/{subreddit.data.display_name}
                                </span>
                            </div>
                            </button>} )}
            </div>
        </aside>
    );
}
    
export default Sidebar