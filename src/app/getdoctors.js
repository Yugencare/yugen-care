import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDoctors = createAsyncThunk("doctor/getDoctors", async (id) => {
  const response = await axios.get(
    "https://server.yugencare.com/api/v1/pages/" + id
  );
  const data = await response.data;
  return data;
});

const DoctorsSlice = createSlice({
  name: "doctor",
  initialState: {
    doctor: [],
    status: null,
  },
  extraReducers: {
    [getDoctors.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDoctors.fulfilled]: (state, { payload }) => {
      state.doctor = payload.doctor;
      state.status = "success";
    },
    [getDoctors.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default DoctorsSlice.reducer;
