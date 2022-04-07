import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getShoppage = createAsyncThunk(
  "shoppage/getShoppage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const ShoppageSlice = createSlice({
  name: "shoppage",
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
    [getShoppage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getShoppage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getShoppage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { setStatus } = ShoppageSlice.actions;
export default ShoppageSlice.reducer;
