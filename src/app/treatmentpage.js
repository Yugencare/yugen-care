import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTreatmentpage = createAsyncThunk(
  "treatmentpage/getTreatmentpage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const TreatmentpageSlice = createSlice({
  name: "treatmentpage",
  initialState: {
    page: [],
    status: null,
  },
  extraReducers: {
    [getTreatmentpage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTreatmentpage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getTreatmentpage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default TreatmentpageSlice.reducer;
