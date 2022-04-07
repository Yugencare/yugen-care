import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFooter = createAsyncThunk("footer/getFooter", async () => {
  const response = await axios.get(
    "https://server.yugencare.com/api/v1/menus/1682eb70-def3-11eb-bc11-d76da9dad027"
  );
  const data = await response.data;
  return data;
});

const FooterSlice = createSlice({
  name: "footer",
  initialState: {
    menu: [],
    status: null,
  },
  extraReducers: {
    [getFooter.pending]: (state, action) => {
      state.status = "loading";
    },
    [getFooter.fulfilled]: (state, { payload }) => {
      state.menu = payload.menus;
      state.status = "success";
    },
    [getFooter.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default FooterSlice.reducer;
