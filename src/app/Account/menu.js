import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  openMenu: false,
  offlineMenuIndex: 0,
};

const menuIndexSlice = createSlice({
  name: "menuIndex",
  initialState,
  reducers: {
    changeIndex(state, { payload }) {
      state.value = payload;
    },
    HandleMenu(state, { payload }) {
      state.openMenu = payload;
    },
    OfflineMenuIndex(state, { payload }) {
      state.offlineMenuIndex = payload;
    },
  },
});
export const { changeIndex, HandleMenu, OfflineMenuIndex } =
  menuIndexSlice.actions;
export default menuIndexSlice.reducer;
