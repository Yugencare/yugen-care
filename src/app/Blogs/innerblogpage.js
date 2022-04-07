import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getInnerblog = createAsyncThunk(
  "innerblog/getInnerblog",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/blogs/" + id
    );
    const data = await response.data;
    return data;
  }
);

const InnerblogSlice = createSlice({
  name: "innerblog",
  initialState: {
    blog: [],
    reviews: [],
    status: null,
  },
  extraReducers: {
    [getInnerblog.pending]: (state, action) => {
      state.status = "loading";
    },
    [getInnerblog.fulfilled]: (state, { payload }) => {
      state.blog = payload.blogs;
      state.reviews = payload.reviews;
      state.status = "success";
    },
    [getInnerblog.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default InnerblogSlice.reducer;
