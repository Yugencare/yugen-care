import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBlogpage = createAsyncThunk(
  "blogpage/getBlogpage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const BlogpageSlice = createSlice({
  name: "blogpage",
  initialState: {
    page: [],
    status: null,
  },
  reducers: {
    setStatus(state, { payload }) {
      state.status = payload;
    },
  },
  extraReducers: {
    [getBlogpage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getBlogpage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getBlogpage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { setStatus } = BlogpageSlice.actions;
export default BlogpageSlice.reducer;
