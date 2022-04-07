import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getServicepage = createAsyncThunk(
  "servicepage/getServicepage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const ServicepageSlice = createSlice({
  name: "servicepage",
  initialState: {
    page: [],
    status: null,
  },
  extraReducers: {
    [getServicepage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getServicepage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getServicepage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default ServicepageSlice.reducer;
