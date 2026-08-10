import searchReducer from "./features/search/searchSlice"
import { configureStore } from '@reduxjs/toolkit';
import selectedPostReducer from "./features/selectedPosts/selectedPostSlice"
import popularSubredditsReducer from "./features/subreddits/subredditsSlice"

const store=configureStore({
    reducer:{
        search:searchReducer,
        selectedPost:selectedPostReducer,
        popularSubreddits:popularSubredditsReducer
    },
})

export default store
