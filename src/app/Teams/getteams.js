import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTeams = createAsyncThunk("serviceIntro/getTeams", async () => {
  const response = await axios.get("https://server.yugencare.com/api/v1/teams");
  const data = await response.data;
  return data;
});

const getTeamsSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    status: null,
  },
  extraReducers: {
    [getTeams.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTeams.fulfilled]: (state, { payload }) => {
      state.teams = payload.team;
      state.status = "success";
    },
    [getTeams.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default getTeamsSlice.reducer;
