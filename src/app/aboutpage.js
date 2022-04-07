import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAboutpage = createAsyncThunk(
  "aboutpage/getAboutpage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const AboutpageSlice = createSlice({
  name: "aboutpage",
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
    [getAboutpage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAboutpage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getAboutpage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { setStatus } = AboutpageSlice.actions;
export default AboutpageSlice.reducer;
