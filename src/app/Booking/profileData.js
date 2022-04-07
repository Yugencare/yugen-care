import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProfileData = createAsyncThunk(
  "bookingdata/getProfileData",
  async () => {
    const response = await axios({
      withCredentials: true,
      method: "GET",
      url: `https://api.yugencare.com/v1/booking/data`,
    });
    const data = await response.data;
    return data;
  }
);

const ProfileDataSlice = createSlice({
  name: "bookingdata",
  initialState: {
    bookingdata: [],
    status: null,
    SelectedDoctor: null,
    isComplete: false,
  },
  reducers: {
    ProfileStatus(state, { payload }) {
      state.isComplete = payload;
    },
  },
  extraReducers: {
    [getProfileData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProfileData.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.bookingdata = payload;
      state.status = "success";
    },
    [getProfileData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { ProfileStatus } = ProfileDataSlice.actions;
export default ProfileDataSlice.reducer;
