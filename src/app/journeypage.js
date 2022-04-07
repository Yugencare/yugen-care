import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getJourney = createAsyncThunk(
  "journey/getJourney",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const JourneySlice = createSlice({
  name: "journey",
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
    [getJourney.pending]: (state, action) => {
      state.status = "loading";
    },
    [getJourney.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getJourney.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { setStatus } = JourneySlice.actions;
export default JourneySlice.reducer;
