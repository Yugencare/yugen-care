import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const appBarSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeIndex(state, { payload }) {
      state.value = payload;
    },
  },
});
export const { changeIndex } = appBarSlice.actions;
export default appBarSlice.reducer;
