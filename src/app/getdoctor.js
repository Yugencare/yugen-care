import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDoctor = createAsyncThunk(
  "doctor/getDoctor",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/teams/" + id
    );
    const data = await response.data;
    return data;
  }
);

const DoctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctor: [],
    status: null,
  },
  extraReducers: {
    [getDoctor.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDoctor.fulfilled]: (state, { payload }) => {
      state.doctor = payload.teams;
      state.status = "success";
    },
    [getDoctor.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default DoctorSlice.reducer;
