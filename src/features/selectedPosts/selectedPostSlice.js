import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const findCommentsByPost=createAsyncThunk(
    "selectedPost/findComments",
    async (arg,thunkAPI)=>{
        const postUrl = `https://www.reddit.com${arg}`;
        const encodedUrl = encodeURIComponent(postUrl);
        const response = await fetch(`https://reddit34.p.rapidapi.com/getPostComments?post_url=${encodedUrl}`,{
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'f2abb8b2b8mshc534215672ecc96p1ffb47jsna98e134d1f92',
                'x-rapidapi-host': 'reddit34.p.rapidapi.com',
                'Content-Type': 'application/json'
	}})
        const data=await response.json()
        return data
    }
)

const selectedPostSlice = createSlice({
  name: "selectedPost",
  initialState: {
    post: [],
    comments: [],
    loading:false,
    error: false
  },
  reducers: {
    setSelectedPost(state, action) {
      state.post = action.payload;
    }
  },
   extraReducers: (builder) => {
      builder
      .addCase(findCommentsByPost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(findCommentsByPost.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data[1].data.children;
      })
      .addCase(findCommentsByPost.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  }
  })

export const { setSelectedPost } = selectedPostSlice.actions;

export const selectSelectedPost = (state) => state.selectedPost.post;

export const selectComments = (state) => state.selectedPost.comments;

export const selectCommentsLoading = (state) => state.selectedPost.loading;

export const selectCommentsError = (state) => state.selectedPost.error;

export default selectedPostSlice.reducer;

export {findCommentsByPost}