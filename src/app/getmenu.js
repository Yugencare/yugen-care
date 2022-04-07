import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMenu = createAsyncThunk("getmenu/getMenu", async () => {
  const response = await axios.get(
    "https://server.yugencare.com/api/v1/menus/active/menu"
  );
  const data = await response.data;
  return data;
});

const getMenuSlice = createSlice({
  name: "getmenu",
  initialState: {
    menu: [],
    status: null,
  },
  extraReducers: {
    [getMenu.pending]: (state, action) => {
      state.status = "loading";
    },
    [getMenu.fulfilled]: (state, { payload }) => {
      state.menu = payload.menus;
      state.status = "success";
    },
    [getMenu.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default getMenuSlice.reducer;
