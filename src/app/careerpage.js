import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCareerpage = createAsyncThunk(
  "careerpage/getCareerpage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const CareerpageSlice = createSlice({
  name: "careerpage",
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
    [getCareerpage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCareerpage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getCareerpage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { setStatus } = CareerpageSlice.actions;
export default CareerpageSlice.reducer;
