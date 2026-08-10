import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const searchRedditByTerm=createAsyncThunk(
    "search/searchRedditByTerm",
    async (arg,thunkAPI)=>{
        const response=await fetch(`https://reddit34.p.rapidapi.com/getSearchPosts?query=${arg}`,{
	method: 'GET',
	headers: {
		'x-rapidapi-key': '1666f45ecdmshb5c3224c75ab443p10bf78jsn8a650b67c8c6',
		'x-rapidapi-host': 'reddit34.p.rapidapi.com',
		'Content-Type': 'application/json'
	}})
        const data=await response.json()
        return data
    }
)

const searchPopularPosts=createAsyncThunk(
    "search/searchPopularPosts",
    async(arg,thunkAPI)=>{
        const response=await fetch('https://reddit34.p.rapidapi.com/getPopularPosts?sort=new',{
	method: 'GET',
	headers: {
		'x-rapidapi-key': '1666f45ecdmshb5c3224c75ab443p10bf78jsn8a650b67c8c6',
		'x-rapidapi-host': 'reddit34.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
})
    const data=await response.json()
    return data
}
)

const searchPostsBySubreddit=createAsyncThunk("popularSubreddits/searchPostsBySubreddit",
    async (arg,thunkAPI)=>{
        const response=await fetch(`https://reddit34.p.rapidapi.com/getTopPostsBySubreddit?subreddit=${arg}&time=year`,{
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1666f45ecdmshb5c3224c75ab443p10bf78jsn8a650b67c8c6',
            'x-rapidapi-host': 'reddit34.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    })
    const data=await response.json()
    return data
    }
)

const searchSlice=createSlice({
    name:"search",
    initialState:{
        searchTerm:"",
        posts:[],
        loading:false,
        error:false,
    },
    reducers:{
    
    },
    extraReducers: (builder) => {
    builder
    .addCase(searchRedditByTerm.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(searchRedditByTerm.fulfilled, (state, action) => {
      state.loading = false;
      state.searchTerm = action.meta.arg;
      state.posts = action.payload.data.posts
    })
    .addCase(searchRedditByTerm.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(searchPopularPosts.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(searchPopularPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload.data.posts
    })
    .addCase(searchPopularPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(searchPostsBySubreddit.pending, (state) => {
            state.loading = true;
            state.error = false;
          })
    .addCase(searchPostsBySubreddit.fulfilled, (state, action) => {
            state.loading = false;
            state.posts=action.payload.data.posts
          })
    .addCase(searchPostsBySubreddit.rejected, (state, action) => {
            state.loading = false;
            state.error = true;});
}
})

export const selectSearchTerm=(state)=>state.search.searchTerm
export const selectPosts=(state)=>state.search.posts
export const selectSearchLoading=(state)=>state.search.loading
export const selectSearchError=(state)=>state.search.error
export default searchSlice.reducer
export {searchRedditByTerm,searchPopularPosts,searchPostsBySubreddit}