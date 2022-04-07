import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTimeslots = createAsyncThunk(
  "timeslots/getTimeslots",
  async ({ id }) => {
    const response = await axios({
      withCredentials: true,
      method: "GET",
      url: `https://api.yugencare.com/v1/booking/slots/${id}`,
    });
    const data = await response.data;
    console.log(data);
    return data;
  }
);

const TimeslotSlice = createSlice({
  name: "timeslots",
  initialState: {
    timeslots: [],
    status: null,
    Selectedtime: null,
  },
  reducers: {
    SelectTime(state, { payload }) {
      state.Selectedtime = payload;
    },
    DeselectTime(state, { payload }) {
      state.Selectedtime = null;
    },
  },
  extraReducers: {
    [getTimeslots.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTimeslots.fulfilled]: (state, { payload }) => {
      if (payload.status === 400) {
        state.timeslots = payload;
      } else {
        state.timeslots = payload.data;
      }
      state.status = "success";
    },
    [getTimeslots.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { SelectTime, DeselectTime } = TimeslotSlice.actions;
export default TimeslotSlice.reducer;
