import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDoctors = createAsyncThunk(
  "doctors/getDoctors",
  async ({ id }) => {
    const response = await axios({
      withCredentials: true,
      method: "GET",
      url: `https://api.yugencare.com/v1/booking/doctors/${id}`,
    });
    const data = await response.data;
    return data;
  }
);

const DoctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    status: null,
    SelectedDoctor: null,
  },
  reducers: {
    UseDoctor(state, { payload }) {
      if (payload.service) {
        let service = {
          center_id: payload.payload.center_id,
          department: payload.payload.department,
          doctor_id: payload.payload.id,
          id: payload.service.id,
          doctor_name: payload.service.name,
          specialisation: payload.payload.specialisation,
        };
        state.SelectedDoctor = service;
      } else {
        state.SelectedDoctor = payload;
      }
    },
    DeselectDoctor(state, { payload }) {
      state.SelectedDoctor = null;
    },
  },
  extraReducers: {
    [getDoctors.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDoctors.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.doctors = payload.data;
      state.status = "success";
    },
    [getDoctors.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { DeselectDoctor, UseDoctor } = DoctorsSlice.actions;
export default DoctorsSlice.reducer;
