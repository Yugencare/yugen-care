import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postReview = createAsyncThunk(
  "products/postReview",
  async (payload) => {
    const post = {
      from: {
        name: payload.name,
        email: payload.email,
      },
      blog: {
        id: payload.id,
        slug: payload.slug,
        title: payload.title,
      },
      message: payload.message,
      rating: payload.rating,
    };

    const response = await axios.post(
      "https://server.yugencare.com/api/v1/products/reviews",
      post
    );
    const data = await response.data;
    return data;
  }
);

const PostSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    poststatus: null,
  },
  extraReducers: {
    [postReview.pending]: (state, action) => {
      state.poststatus = "loading";
    },
    [postReview.fulfilled]: (state, { payload }) => {
      state.post = payload;
      state.poststatus = "success";
    },
    [postReview.rejected]: (state, action) => {
      state.poststatus = "failed";
    },
  },
});
export default PostSlice.reducer;
