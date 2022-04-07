import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getServiceIntro = createAsyncThunk(
  "serviceIntro/getServiceIntro",
  async () => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/service-intro"
    );
    const data = await response.data;
    return data;
  }
);

const ServiceIntroSlice = createSlice({
  name: "serviceIntro",
  initialState: {
    serviceIntro: [],
    status: null,
  },
  extraReducers: {
    [getServiceIntro.pending]: (state, action) => {
      state.status = "loading";
    },
    [getServiceIntro.fulfilled]: (state, { payload }) => {
      state.serviceIntro = payload.services;
      state.status = "success";
    },
    [getServiceIntro.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default ServiceIntroSlice.reducer;
