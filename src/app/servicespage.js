import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getServicesPage = createAsyncThunk(
  "servicespage/getServicesPage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const ServicespageSlice = createSlice({
  name: "servicespage",
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
    [getServicesPage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getServicesPage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getServicesPage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { setStatus } = ServicespageSlice.actions;
export default ServicespageSlice.reducer;
