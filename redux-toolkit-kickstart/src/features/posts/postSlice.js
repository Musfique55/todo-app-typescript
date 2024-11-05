import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPost = createAsyncThunk('posts/postsByStatus',async() => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return res.data;
})
const postSlice = createSlice({
        name : 'posts',
        initialState : {
           posts : [],
           isLoading : false,
           error : null
        },
        reducers : {},
        extraReducers : (builder) => {
            builder
            .addCase(fetchPost.pending,(state) => {
                state.isLoading = true,
                state.error = null
            })
            .addCase(fetchPost.fulfilled,(state,action) => {
                state.isLoading = false,
                state.posts = action.payload,
                state.error = null
            })
            .addCase(fetchPost.rejected,(state,action) => {
                state.error = action.error,
                state.isLoading = false,
                state.posts = []
            })
        }
            
        
})

export default postSlice.reducer;