import Header from "../components/Header/Header"
import Postlist from "../components/Posts/Postlist"
import { useEffect } from "react"
import { searchPopularPosts, searchRedditByTerm } from "../features/search/searchSlice"
import { useDispatch,useSelector } from "react-redux"
import Sidebar from "../components/Sidebar/Sidebar"
import "./Home.css"
import { findPopularSubreddits } from "../features/subreddits/subredditsSlice"
import { selectSearchLoading } from "../features/search/searchSlice"
import PostSkeleton from "../components/Loading/PostSkeleton"
import { selectSearchError } from "../features/search/searchSlice"
import Error from "../components/Error/Error"
import { selectSubredditError } from "../features/subreddits/subredditsSlice";
import { useSearchParams } from "react-router-dom";

function Home(){
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search");
    const dispatch=useDispatch()
    useEffect(()=>{
    dispatch(findPopularSubreddits())
    if(searchTerm) {
        dispatch(searchRedditByTerm(searchTerm))
    } 
    else{
        dispatch(searchPopularPosts())
    }
}, [dispatch,searchTerm])
    const loading=useSelector(selectSearchLoading)
    const searchError=useSelector(selectSearchError)
    const subredditError=useSelector(selectSubredditError)
    if(searchError){
        return (
            <Error message="Unable to load Reddit posts" onRetry={()=>searchTerm? dispatch(searchRedditByTerm(searchTerm)) : dispatch(searchPopularPosts())}/>
        )
    }
     if(subredditError){
        return <Error message="Couldn't load the trending communities" onRetry={()=>dispatch(findPopularSubreddits())}/>
    }
    return(
            <div className="home">
            <Header />
             <main className="home-content">
            <Sidebar />
              <div className="posts-container">
                     {loading ? <PostSkeleton/> : <Postlist />}
                </div>
    </main>

        </div>
    );
}

export default Home