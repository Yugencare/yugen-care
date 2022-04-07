import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMembershipPage = createAsyncThunk(
  "membershipPage/getMembershipPage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const MembershipPageSlice = createSlice({
  name: "membershipPage",
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
    [getMembershipPage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getMembershipPage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getMembershipPage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { setStatus } = MembershipPageSlice.actions;
export default MembershipPageSlice.reducer;
