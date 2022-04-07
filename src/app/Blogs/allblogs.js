import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBlogs = createAsyncThunk("blogs/getBlogs", async () => {
  const response = await axios.get(
    "https://server.yugencare.com/api/v1/blogs/"
  );
  const data = await response.data;
  return data;
});

const BlogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    blogsstatus: null,
  },
  extraReducers: {
    [getBlogs.pending]: (state, action) => {
      state.status = "loading";
    },
    [getBlogs.fulfilled]: (state, { payload }) => {
      state.blogs = payload.blogs;
      state.blogsstatus = "success";
    },
    [getBlogs.rejected]: (state, action) => {
      state.blogsstatus = "failed";
    },
  },
});
export default BlogsSlice.reducer;
