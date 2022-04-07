import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getInnerservicepage = createAsyncThunk(
  "innerservicepage/getInnerservicepage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const InnerservicepageSlice = createSlice({
  name: "innerservicepage",
  initialState: {
    page: [],
    status: null,
  },
  extraReducers: {
    [getInnerservicepage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getInnerservicepage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getInnerservicepage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default InnerservicepageSlice.reducer;
