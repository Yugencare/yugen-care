import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProfessionalpage = createAsyncThunk(
  "professionalpage/getProfessionalpage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const ProfessionalpageSlice = createSlice({
  name: "professionalpage",
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
    [getProfessionalpage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProfessionalpage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getProfessionalpage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { setStatus } = ProfessionalpageSlice.actions;
export default ProfessionalpageSlice.reducer;
