import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFrontpage = createAsyncThunk(
  "frontpage/getFrontpage",
  async ({ id }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/" + id
    );
    const data = await response.data;
    return data;
  }
);

const FrontpageSlice = createSlice({
  name: "frontpage",
  initialState: {
    page: [],
    status: null,
  },
  reducers: {
    resetStates: (state) => {
      state.status = null;
      state.page = [];
    },
  },
  extraReducers: {
    [getFrontpage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getFrontpage.fulfilled]: (state, { payload }) => {
      state.page = payload.page;
      state.status = "success";
    },
    [getFrontpage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

const { resetStates } = FrontpageSlice.actions;
export const resetStatesAysnc = () => async (dispatch) => {
  dispatch(resetStates());
};

export default FrontpageSlice.reducer;
