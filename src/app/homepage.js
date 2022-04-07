import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getHomepage = createAsyncThunk(
  "homepage/getHomepage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id,
    );
    const data = await response.data;
    return data;
  },
);

export const getHome = createAsyncThunk("homepage/getHome", async () => {
  const response = await axios.get(
    "https://server.yugencare.com/api/v1/pages/81e8cf70-2beb-11ec-b5cf-1f39cd3606e2",
  );
  const data = await response.data;
  // console.log(data);
  return data;
});

const HomepageSlice = createSlice({
  name: "homepage",
  initialState: {
    page: [],
    status: null,
    promo: [],
    promoStatus: null,
  },
  extraReducers: {
    [getHomepage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getHomepage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getHomepage.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getHome.pending]: (state, action) => {
      state.promoStatus = "loading";
    },
    [getHome.fulfilled]: (state, { payload }) => {
      state.promo = payload.page;
      state.promoStatus = "success";
    },
    [getHome.rejected]: (state, action) => {
      state.promoStatus = "failed";
    },
  },
});
export default HomepageSlice.reducer;
