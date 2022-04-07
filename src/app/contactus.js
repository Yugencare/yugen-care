import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getContactpage = createAsyncThunk(
  "contactpage/getContactpage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const ContactpageSlice = createSlice({
  name: "contactpage",
  initialState: {
    page: [],
    status: null,
  },
  reducers: {
    setStatus(state, { payload }) {
      state.status = payload.status;
      state.page = payload.page;
    },
  },
  extraReducers: {
    [getContactpage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getContactpage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getContactpage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { setStatus } = ContactpageSlice.actions;
export default ContactpageSlice.reducer;
