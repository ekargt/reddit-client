import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const findPopularSubreddits=createAsyncThunk(
    "popularSubreddits/findPopularSubreddits",
    async (arg,thunkAPI)=>{
        const response=await fetch('https://reddit34.p.rapidapi.com/getPopularSubreddits',{
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


const popularSubredditsSlice=createSlice({
    name:"popularSubreddits",
    initialState:{
        subreddits:[],
        loading:false,
        error:false
    },
    reducers:{

    },
     extraReducers: (builder) => {
          builder
          .addCase(findPopularSubreddits.pending, (state) => {
            state.loading = true;
            state.error = false;
          })
          .addCase(findPopularSubreddits.fulfilled, (state, action) => {
            state.loading = false;
            state.subreddits = action.payload.data.subreddits
          })
          .addCase(findPopularSubreddits.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
          });
      }
      })

export {findPopularSubreddits}
export default popularSubredditsSlice.reducer
export const selectSubreddits=(state)=>state.popularSubreddits.subreddits
export const selectSubredditLoading=(state)=>state.popularSubreddits.loading
export const selectSubredditError=(state)=>state.popularSubreddits.error
